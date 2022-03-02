import React from "react";
import {Routes as DomRoutes, Route} from "react-router-dom";
import Login from "../pages/authentication/Login";
import Received from "../pages/invitations/Received";
import Sent from "../pages/invitations/Sent";

const Home = React.lazy(() => import("../pages/Home"));

const Routes: React.FC = () => {
    return (
        <DomRoutes>
            <Route
                path="invitations"
                element={
                    <React.Suspense fallback={<div>unable to load page</div>}>
                        <Home/>
                    </React.Suspense>
                }>
                <Route index={true} element={
                    <React.Suspense fallback={<div>Unable to load page</div>}>
                        <Received/>
                    </React.Suspense>
                }/>
                <Route path="sent" element={
                    <React.Suspense fallback={<div>Unable to load page</div>}>
                        <Sent/>
                    </React.Suspense>
                }/>
            </Route>
            <Route
                path="login"
                element={
                    <React.Suspense fallback={<div>unable to load page</div>}>
                        <Login/>
                    </React.Suspense>
                }
            />
        </DomRoutes>
    );
};

export default Routes;
