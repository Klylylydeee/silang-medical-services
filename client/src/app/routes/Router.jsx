import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "src/app/main/local/Home";
import NotFound from "../main/404/NotFound";

import BuildUnsuccessful from "../main/general/builder/BuildUnsuccessful";
import SignIn from "../main/dashboard/sign-in/SignIn";
import Default from "../main/dashboard/default/Default";
import Analytics from "../main/dashboard/analytics/Analytics";

import AuthWrapper from "src/app/routes/template/AuthWrapper";
import Layout from "./template/Layout";

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
