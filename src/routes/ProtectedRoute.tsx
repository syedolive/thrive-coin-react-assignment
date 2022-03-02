import React from "react";

import {Navigate, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
    const location = useLocation();
    if(Cookies.get('userData') === ''){
        return <Navigate to={'/login'} state={{from: location}} replace/>
    }
    return children;

}

export default ProtectedRoute;
