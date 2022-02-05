// Yarn packages
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

// React router
import Router from "src/app/routes/Router";

// Language
import { IntlProvider } from "react-intl";
import AppLocale from "src/app/language/lang";

// Responsive
// import AppDimension from "src/app/util/responsive";

// Global styles
import "antd/dist/antd.less";
import "src/styles/global.scss";

function App() {
    
    const { language } = useSelector((state) => state.webApp);

    // AppDimension();

    // Check if a user has a JWT existing in the browser's localStorage
    // which will determine if he will be re-authenticated
    useEffect(() => {
        // Would only run if its in a private build
        localStorage.getItem("Authorization") &&
        process.env.REACT_APP_ENVIRONMENT_STAGE === "Private Build"
            ? console.log("Yes JWT")
            : console.log("No Jwt");
    });
    
    return (
        <IntlProvider locale={language} messages={AppLocale[language]}>
            <Router />
        </IntlProvider>
    );
    
}

export default App;
