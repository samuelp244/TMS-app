import React from "react";
import { Navigate,Outlet, useLocation } from "react-router-dom";

// export interface ProtectedRouteProps {
//     children: React.ReactNode;
// }
// export const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
export const ProtectedRoute = ()=> {
    const location = useLocation();
    const isLoggedIn = (localStorage.getItem("userLoggedIn")==="true")
    // console.log(localStorage.getItem("userLoggedIn"))
    // console.log(isLoggedIn)
    // if (!isLoggedIn) {
    //     // user is not authenticated
    //     return <Navigate to="/" />;
    // }
    return isLoggedIn?<Outlet/>:<Navigate to="/" replace state={{ from: location }}/>
};