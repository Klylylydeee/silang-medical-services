// Yarn packages
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "src/app/store/user/userInformation";
import { authorizeUser } from "src/app/store/web/webInformation";
import { Spin } from 'antd';
import toasterRequest from "src/app/util/toaster";
import jwt from "jsonwebtoken";

// React router
import Router from "src/app/routes/Router";

// Language
import { IntlProvider } from "react-intl";
import AppLocale from "src/app/language/lang";

// Responsive
import AppDimension from "src/app/util/responsive";

// Global styles
import "antd/dist/antd.less";
import "src/styles/global.scss";
import "swiper/swiper.min.css";

function App() {
    
    const dispatch = useDispatch();
    const { authorization, language, loading } = useSelector((state) => state.web);

    AppDimension();

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
    
    return (
        <IntlProvider locale={language} messages={AppLocale[language]}>
            <Spin tip="Loading..." spinning={authorization === true ? false : loading}>
                <Router />
            </Spin>
        </IntlProvider>
    );
    
}

export default App;
