// NPM Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async" 

// Dependencies Functions
import App from "src/App";
import reportWebVitals from "src/reportWebVitals";
import store from "src/app/store/store";

ReactDOM.render(
    <React.StrictMode>
        {/* 
            Redux Store
                Without this redux actions, stores, and reduces would not be accessible on child components.
        */}
        <Provider store={store}>
            {/* 
                SEO Metadata Provider
                    Without this HTML headers would not be dynamic and search enginges
                    would not anything to crawl during indexing.
            */}
            <HelmetProvider>
                {/* 
                    React Navigation
                        Without this users will not be able to navigate to different component
                        of the single page application.
                */}
                <Router>
                    {/* 
                        React
                            The React Application itself which will be a single-page-application once
                            it has been built.
                    */}
                    <App />
                </Router>
            </HelmetProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
