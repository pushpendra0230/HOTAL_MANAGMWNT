// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./pages/auth/SignUp";
// import LogIn from "./pages/auth/Login";
// import Otp from "./pages/auth/Otp";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import User from "./pages/users/user";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LogIn />,
//   },
//   {
//     path: "/sign-up",
//     element: <SignUp />,
//   },
//   {
//     path: "/verification",
//     element: <Otp />,
//   },
//   {
//     path: "/dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "/user",
//     element: <User />,
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router}></RouterProvider>;
// };

// export default App;





// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./pages/auth/SignUp";
// import LogIn from "./pages/auth/Login";
// import Otp from "./pages/auth/Otp";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import User from "./pages/users/user";
// import ForgetPassword from "./pages/auth/ForgetPassword";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LogIn />,
//   },
//   {
//     path: "/sign-up",
//     element: <SignUp />,
//   },
//   {
//     path: "/verification",
//     element: <Otp />,
//   },
//   {
//     path: "/dashboard",
//     element: <AdminDashboard />,
//   },
//   {
//     path: "/user",
//     element: <User />,
//   },
//   {
//     path: "/forget-password",
//     element: <ForgetPassword />,
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router}></RouterProvider>;
// };

// export default App;







import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import User from "./pages/users/user";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ProtectedRoute from "./routes/ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/verification",
    element: <Otp />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute allowedRole="user">
        <User />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;