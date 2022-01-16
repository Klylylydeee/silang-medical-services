import React from "react";
import { Routes, Route } from "react-router-dom";

// Public route
import Home from "src/app/main/local/landing/Home";

// Private - Unprotected route
import SignIn from "src/app/main/dashboard/sign-in/SignIn";
// Private - Protected route
import Default from "src/app/main/dashboard/default/Default";
import Analytics from "src/app/main/dashboard/analytics/Analytics";

// General route
import NotFound from "src/app/main/general/404/NotFound";
import BuildUnsuccessful from "src/app/main/general/builder/BuildUnsuccessful";

// Layout and Authentication
import AuthWrapper from "src/app/routes/template/AuthWrapper";
import Layout from "src/app/routes/template/Layout";

function Router() {

    return (
        <Routes>
            {
                process.env.REACT_APP_ENVIRONMENT_STAGE === "Public Build" ? 
                    (
                        // These are the routes if yarn start-public / build-public is executed 
                        // these routes can be accessed from this URL
                        // https://silang-medical.com/
                        <>
                            <Route path="/" element={<Home />}/>
                            <Route path="*" element={<NotFound />}/>
                        </>
                    )
                :
                process.env.REACT_APP_ENVIRONMENT_STAGE === "Private Build" ?
                    (
                        // These are the routes if yarn start-private / build-private is executed
                        // these routes can be accessed from this URL
                        // https://portal.silang-medical.com/
                        <>
                            <Route path="/" element={ <AuthWrapper authStatus={false} redirectTo="dashboard" component={ <SignIn /> } />}/>
                            <Route path="dashboard" element={ <Layout />}>
                                <Route path="" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<Default />} /> } />
                                <Route path="analytics" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<Analytics />} /> } />
                                <Route path="sent" element={<Analytics />} />
                                <Route path="*" element={ <NotFound /> }/>
                            </Route>
                            <Route path="*" element={ <NotFound /> }/>
                        </>
                    )
                :
                    // If the react has been executed and does not contain any environment variable
                    // to determine which build, an error builder page will be generated for all of its route
                    (
                        <Route path="*" element={<BuildUnsuccessful />} />
                    )
            }
        </Routes>
    )
}

export default Router
