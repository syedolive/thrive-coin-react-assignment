import React from "react";

import {Navigate, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
    const location = useLocation();
    const cookieData = Cookies.get('userData');
    if(cookieData === '' || cookieData === undefined){
        return <Navigate to={'/login'} state={{from: location}} replace/>
    }
    return children;

}

export default ProtectedRoute;
