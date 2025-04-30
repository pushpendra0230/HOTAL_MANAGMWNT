import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/" replace />;
    }

    if (allowedRole !== role) {
        // If role not allowed, send back to login or forbidden page
        return <Navigate to="/" replace />;
    }

    // If all good, render the children (dashboard/user page)
    return children;
};

export default ProtectedRoute;