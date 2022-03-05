// Yarn packages
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import jwt from "jsonwebtoken";

import { signIn } from "src/app/store/user/userInformation";
import { authorizeUser, unauthorizeUser } from "src/app/store/web/webInformation";
import toasterRequest from "src/app/util/toaster";

// The AuthWrapper component contains three parameters which are as follow inside the brackets
// component: Is a JSX Component that will be rendered once authorization succeeds
// redirectTo: Determines which path the user will be redirected to if its authorization fails
// authStatus: Determines wether a route is protected or not, it is based on a true or false value

// For future reference: https://stackoverflow.com/a/69870303

function AuthWrapper({ component, redirectTo, authStatus, users }) {

    const dispatch = useDispatch();
    const { designation } = useSelector((state) => state.user);
    const { authorization } = useSelector((state) => state.web);
    const history = useNavigate();
    
    if(localStorage.getItem("Authorization") && authorization === true) {
        try {
            jwt.verify(localStorage.getItem("Authorization"), process.env.REACT_APP_JWT_BACKEND);
        } catch(err) {
            dispatch(unauthorizeUser());
            toasterRequest({ payloadType: "error", textString: "Authorization has expired."})
        }
    } else if(localStorage.getItem("Authorization") && authorization === false){
        try {
            let decodedData = jwt.verify(localStorage.getItem("Authorization"), process.env.REACT_APP_JWT_BACKEND);
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
        } catch(err) {
            localStorage.removeItem("Authorization");
            err.response ? 
                toasterRequest({ payloadType: "error", textString: err.response.data.message})
            :
                toasterRequest({ payloadType: "error", textString: err.message});
        }
    } else if (authorization !== authStatus && !localStorage.getItem("Authorization")) {
        toasterRequest({ payloadType: "warning", textString: "Route is restricted!"})
    }

    useEffect(() => {
        if(users !== undefined){
            if(!users.some((wrapperDesignation) => {
                return wrapperDesignation === designation
            })){
                history("/");
                toasterRequest({ payloadType: "error", textString: "Current user designation does not have authority for this path!"})
            }
        }
    // eslint-disable-next-line
    }, []);

    // Returns the JSX Component back to the Router to be rendered
    return authorization === authStatus ? component : <Navigate to={redirectTo} />;

}

export default AuthWrapper
