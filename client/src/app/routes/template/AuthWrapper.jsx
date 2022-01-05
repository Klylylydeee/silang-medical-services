// Yarn packages
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// The AuthWrapper component contains three parameters which are as follow inside the brackets
// component: Is a JSX Component that will be rendered once authorization succeeds
// redirectTo: Determines which path the user will be redirected to if its authorization fails
// authStatus: Determines wether a route is protected or not, it is based on a true or false value

// For future reference: https://stackoverflow.com/a/69870303

function AuthWrapper({ component, redirectTo, authStatus }) {

    // Redux state value
    const { authorization } = useSelector((state) => state.webApp);

    // Returns the JSX Component back to the Router to be rendered
    return authorization === authStatus ? component : <Navigate to={redirectTo} />;

}

export default AuthWrapper
