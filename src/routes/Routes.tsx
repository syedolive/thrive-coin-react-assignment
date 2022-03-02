import React from "react";
import {Routes as DomRoutes, Route, Navigate, useLocation} from "react-router-dom";
import ApplicationHoc from "../HOC";
import ProtectedRoute from "./ProtectedRoute";

const Received = React.lazy(() => import("../pages/invitations/Received"));
const Sent = React.lazy(() => import("../pages/invitations/Sent"));

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import('../pages/authentication/Login'))

const WrappedLogin = ApplicationHoc(Login);
const WrappedHome = ApplicationHoc(Home);
const WrappedReceived = ApplicationHoc(Received);
const WrappedSent = ApplicationHoc(Sent);



const Routes: React.FC = () => {
    return (
        <DomRoutes>
            <Route path="invitations" element={
                <ProtectedRoute>
                    <WrappedHome/>
                </ProtectedRoute>
            }>
                <Route index={true} element={<WrappedReceived/>}/>
                <Route path="sent" element={<WrappedSent/>}/>
            </Route>
            <Route path="login" element={<WrappedLogin/>}/>
            <Route path={"*"} element={
                <div>No Page exists on this route</div>
            }/>
        </DomRoutes>
    );
};

export default Routes;
