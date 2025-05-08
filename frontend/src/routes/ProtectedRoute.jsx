// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRole }) => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     if (!token) {
//         return <Navigate to="/" replace />;
//     }

//     if (allowedRole !== role) {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;





import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // If no token exists, redirect to login page
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // If the role does not match the allowed role, redirect to login page
    if (!role || allowedRole.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/" replace />;
    }

    // If both token and role match, render the children
    return children;
};

export default ProtectedRoute;