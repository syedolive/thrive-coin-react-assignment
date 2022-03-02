import React from "react";
import {useUserContext} from "../stores/user.store";
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRoute = ({children}: {children: JSX.Element}) => {

    return children;

}

export default ProtectedRoute;
