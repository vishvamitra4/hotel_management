import React from "react";
import { Outlet, Navigate } from "react-router-dom"
function ProtectedRoute({ isAdmin }) {

    const userToken = window.localStorage.getItem("userToken");
    

    if (!userToken || userToken.length === 0 || isAdmin != localStorage.getItem("isAdmin")) return <Navigate to={"/"} />;

    return <Outlet />

};

export default ProtectedRoute;