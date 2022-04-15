// NPM Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Empty } from 'antd';
import jwt from "jsonwebtoken";
import { IntlProvider } from "react-intl";

// Modular Functions
import { signIn } from "src/app/store/user/userInformation";
import { authorizeUser } from "src/app/store/web/webInformation";
import toasterRequest from "src/app/util/toaster";

// Dependencies Functions
import Router from "src/app/routes/Router";
import AppLocale from "src/app/language/lang";
import AppDimension from "src/app/util/responsive";

// Stylings
import "antd/dist/antd.less";
import "src/styles/global.scss";
import "swiper/swiper.min.css";

// Assets
import EmptyProps from "src/app/test/landing/LandingLogo.png"

const App = () => {
    
    // Functional Component Hooks
    const dispatch = useDispatch();
    
    // Redux Variables
    const { authorization, language, loading } = useSelector((state) => state.web);

    // Retrieve the browser's innerWidth and innerHeight
    AppDimension();

    // Disconnected component basis
    const [isOnline, setNetwork] = useState(window.navigator.onLine);
    const UseNetwork = (variable, setter) => {
        const updateNetwork = () => {
            setter(window.navigator.onLine);
        };
        useEffect(() => {
           window.addEventListener("offline", updateNetwork);
           window.addEventListener("online", updateNetwork);
           return () => {
              window.removeEventListener("offline", updateNetwork);
              window.removeEventListener("online", updateNetwork);
           };
        });
    };
    UseNetwork(isOnline, setNetwork);

    // On component load, check whether the user has an existing token to whether redirect to dashboard or retain the current page
    const checkAuthorization = async () => {
        try{
            if(localStorage.getItem("Authorization")){
                let decodedData = await jwt.verify(localStorage.getItem("Authorization"), process.env.REACT_APP_JWT_BACKEND);
                dispatch(
                    signIn({
                        first_name : decodedData.first_name,
                        last_name : decodedData.last_name,
                        email : decodedData.email,
                        phone_number : decodedData.phone_number,
                        barangay : decodedData.barangay,
                        designation : decodedData.designation
                    })
                );
                dispatch(authorizeUser({
                    language : decodedData.language
                }));
            }
        } catch (err) {
            localStorage.removeItem("Authorization");
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message === "jwt expired" ? "Authentication session has expired" : "Authentication session incorrect!"})
            :
                toasterRequest({ payloadType: "error", textString: err.message === "jwt expired" ? "Authentication session has expired" : "Authentication session incorrect!"});
        }
    }

    // Check if a user has a JWT existing in the browser's localStorage
    // which will determine if he will be re-authenticated
    useEffect(() => {
        // Would only run if its in a private build
        checkAuthorization();
    // eslint-disable-next-line
    }, []);

    // Disable browser's right click functionality to prevent images to be saved.
    // document.addEventListener('contextmenu', (event) => { event.preventDefault() });
    
    return (
        <IntlProvider locale={language} messages={AppLocale[language]}>
            <Spin tip="Loading..." spinning={authorization === true ? false : loading} style={{zIndex: 999999999}}>
                {
                    isOnline === true ?
                        <Router />
                    :
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
                            <Empty image={EmptyProps} description="Internet connection is too slow or your device has been disconnected!"/> 
                        </div>
                }
            </Spin>
        </IntlProvider>
    );
    
}

export default App;
