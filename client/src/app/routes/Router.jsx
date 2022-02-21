import React from "react";
import { Routes, Route } from "react-router-dom";

// Public route
import Home from "src/app/main/local/landing/Home";
import ActivityList from "src/app/main/local/activity/BarangayEventList";
import Activity from "src/app/main/local/activity/BarangayEvent";
import MedicalList from "src/app/main/local/medical-record/MedicalRecordList";
import MedicalPDF from "src/app/main/local/medical-record/GeneratedMedicalRecord";

// Private - Unprotected route
import SignIn from "src/app/main/dashboard/sign-in/SignIn";
// Private - Protected route
import Default from "src/app/main/dashboard/default/Default";
import Analytics from "src/app/main/dashboard/analytics/Analytics";
import AnalyticData from "src/app/main/dashboard/analytics/AnalyticData";
import MedicalListPrivate from "src/app/main/dashboard/medical-record/MedicalList";
import MedicalCreate from "src/app/main/dashboard/medical-record/MedicalCreate";
import MedicalUpdate from "src/app/main/dashboard/medical-record/MedicalUpdate";
import MedicalData from "src/app/main/dashboard/medical-record/MedicalData";
import EventCreate from "src/app/main/dashboard/event-listing/EventCreate";
import EventData from "src/app/main/dashboard/event-listing/EventData";
import EventList from "src/app/main/dashboard/event-listing/EventList";
import EventUpdate from "src/app/main/dashboard/event-listing/EventUpdate";
import Communication from "src/app/main/dashboard/communication/Communication";
import UserCreate from "src/app/main/dashboard/users/UserCreate";

// General route
import NotFound from "src/app/main/general/404/NotFound";
import BuildUnsuccessful from "src/app/main/general/builder/BuildUnsuccessful";

// Layout and Authentication
import AuthWrapper from "src/app/routes/template/AuthWrapper";
import Layout from "src/app/routes/template/Layout";

import TestSwiper from "src/app/test/TestSwiper";

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
                            {/* Medical Record Components */}
                            <Route path="/medical-record" element={<MedicalList />}/>
                            <Route path="/medical-record/:barangay/generate-document/:id" element={<MedicalPDF />}/>
                            {/* Barangay Activities Components */}
                            <Route path="/barangay-activities/:barangay" element={<ActivityList />}/>
                            <Route path="/barangay-activities/:barangay/id/:id" element={<Activity />}/>
                            <Route path="/test" element={<TestSwiper />}/>
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
                                {/* Landing Page of Dashboard */}
                                <Route path="" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<Default />} /> } />
                                {/* Analytics Components */}
                                <Route path="analytics" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<Analytics />} /> } />
                                <Route path="analytics/:year/:month" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<AnalyticData />} /> } />
                                {/* Medical Record Components */}
                                <Route path="medical-records" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<MedicalListPrivate />} /> } />
                                <Route path="medical-records/create" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<MedicalCreate />} /> } />
                                <Route path="medical-records/update/:id" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<MedicalUpdate />} /> } />
                                <Route path="medical-records/view/:id" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<MedicalData />} /> } />
                                {/* Event Listing Components */}
                                <Route path="event-listing" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<EventList />} /> } />
                                <Route path="event-listing/create" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<EventCreate />} /> } />
                                <Route path="event-listing/update/:id" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<EventUpdate />} /> } />
                                <Route path="event-listing/view/:id" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<EventData />} /> } />
                                {/* Communication Component */}
                                <Route path="communication" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<Communication />} /> } />
                                {/* User Component */}
                                <Route path="users" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<AnalyticData />} /> } />
                                <Route path="users/create/invitation" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<UserCreate />} /> } />
                                <Route path="users/update/:id" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<AnalyticData />} /> } />
                                <Route path="users/view/:id" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<AnalyticData />} /> } />
                                {/* Setting Component */}
                                <Route path="setting" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<AnalyticData />} /> } />
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
