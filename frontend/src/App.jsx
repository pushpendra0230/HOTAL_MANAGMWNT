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







// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./pages/auth/SignUp";
// import LogIn from "./pages/auth/Login";
// import Otp from "./pages/auth/Otp";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import User from "./pages/users/user";
// import ForgetPassword from "./pages/auth/ForgetPassword";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import ResetPassword from "./pages/auth/ResetPassword";

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
//     element: (
//       <ProtectedRoute allowedRole="admin">
//         <AdminDashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/user",
//     element: (
//       <ProtectedRoute allowedRole="user">
//         <User />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/forget-password",
//     element: <ForgetPassword />,
//   },
//   {
//     path: "/reset-password",
//     element: <ResetPassword />,
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />;
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
// import ResetPassword from "./pages/auth/ResetPassword";
// import State from "./pages/admin/State";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const router = createBrowserRouter([
//   { path: "/", element: <LogIn /> },
//   { path: "/sign-up", element: <SignUp /> },
//   { path: "/verification", element: <Otp /> },
//   {
//     path: "/dashboard",
//     element: (
//       <ProtectedRoute allowedRole="admin">
//         <AdminDashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/state",
//     element: (
//       <ProtectedRoute allowedRole="admin">
//         <State />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/user",
//     element: (
//       <ProtectedRoute allowedRole="user">
//         <User />
//       </ProtectedRoute>
//     ),
//   },
//   { path: "/forget-password", element: <ForgetPassword /> },
//   { path: "/reset-password", element: <ResetPassword /> },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />;
// };

// export default App;








// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./pages/auth/SignUp";
// import LogIn from "./pages/auth/Login";
// import Otp from "./pages/auth/Otp";
// import ForgetPassword from "./pages/auth/ForgetPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import User from "./pages/users/user";
// import AdminLayout from "./layouts/AdminLayout";
// import State from "./pages/admin/State";
// import Location from "./pages/admin/Location";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const router = createBrowserRouter([
//   { path: "/", element: <LogIn /> },
//   { path: "/sign-up", element: <SignUp /> },
//   { path: "/verification", element: <Otp /> },
//   { path: "/forget-password", element: <ForgetPassword /> },
//   { path: "/reset-password", element: <ResetPassword /> },
//   {
//     path: "/admin",
//     element: (
//       <ProtectedRoute allowedRole="admin">
//         <AdminLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { path: "dashboard", element: <Location /> },
//       { path: "state", element: <State /> },
//     ],
//   },
//   {
//     path: "/user",
//     element: (
//       <ProtectedRoute allowedRole="user">
//         <User />
//       </ProtectedRoute>
//     ),
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />;
// };

// export default App;










// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./pages/auth/SignUp";
// import LogIn from "./pages/auth/Login";
// import Otp from "./pages/auth/Otp";
// import ForgetPassword from "./pages/auth/ForgetPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import User from "./pages/users/user";
// import AdminLayout from "./layouts/AdminLayout";
// import State from "./pages/admin/State";
// import Location from "./pages/admin/Location";
// import Hotel from "./pages/admin/Hotel";
// import ProtectedRoute from "./routes/ProtectedRoute";

// const router = createBrowserRouter([
//   { path: "/", element: <LogIn /> },
//   { path: "/sign-up", element: <SignUp /> },
//   { path: "/verification", element: <Otp /> },
//   { path: "/forget-password", element: <ForgetPassword /> },
//   { path: "/reset-password", element: <ResetPassword /> },
//   {
//     path: "/admin",
//     element: (
//       <ProtectedRoute allowedRole="admin">
//         <AdminLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { path: "dashboard", element: <Location /> },
//       { path: "state", element: <State /> },
//       { path: "hotels", element: <Hotel /> },
//     ],
//   },
//   {
//     path: "/user",
//     element: (
//       <ProtectedRoute allowedRole="user">
//         <User />
//       </ProtectedRoute>
//     ),
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />;
// };

// export default App;








// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import SignUp from "./pages/auth/SignUp";
// import LogIn from "./pages/auth/Login";
// import Otp from "./pages/auth/Otp";
// import ForgetPassword from "./pages/auth/ForgetPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import User from "./pages/users/user";
// import AdminLayout from "./layouts/AdminLayout";
// import State from "./pages/admin/State";
// import Location from "./pages/admin/Location";
// import Hotel from "./pages/admin/Hotel";
// import Room from "./pages/admin/Room";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import AddRoomPage from "./pages/users/AddRoomPage";

// const router = createBrowserRouter([
//   { path: "/", element: <LogIn /> },
//   { path: "/sign-up", element: <SignUp /> },
//   { path: "/verification", element: <Otp /> },
//   { path: "/forget-password", element: <ForgetPassword /> },
//   { path: "/reset-password", element: <ResetPassword /> },
//   {
//     path: "/admin",
//     element: (
//       <ProtectedRoute allowedRole="admin">
//         <AdminLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { path: "dashboard", element: <Location /> },
//       { path: "state", element: <State /> },
//       { path: "hotels", element: <Hotel /> },
//       { path: "rooms", element: <Room /> },
//     ],
//   },
//   {
//     path: "/user",
//     element: (
//       <ProtectedRoute allowedRole="user">
//         <User />
//       </ProtectedRoute>
//     ),
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />;
// };

// export default App;




import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/Login";
import Otp from "./pages/auth/Otp";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import User from "./pages/users/user";
import AdminLayout from "./layouts/AdminLayout";
import State from "./pages/admin/State";
import Location from "./pages/admin/Location";
import Hotel from "./pages/admin/Hotel";
import Room from "./pages/admin/Room";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddRoomPage from "./pages/users/AddRoomPage";
import BookingForm from "./pages/users/BookingForm";
import MyBookings from "./pages/users/MyBookings";
import BookingPanel from "./pages/admin/BookingPanel";

const router = createBrowserRouter([
  { path: "/", element: <LogIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/verification", element: <Otp /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Location /> },
      { path: "state", element: <State /> },
      { path: "hotels", element: <Hotel /> },
      { path: "rooms", element: <Room /> },
      { path: "bookings", element: <BookingPanel /> },
    ],
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
    path: "/user/add-room/:roomId",
    element: (
      <ProtectedRoute allowedRole="user">
        <AddRoomPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/book-room/:roomId",
    element: (
      <ProtectedRoute allowedRole="user">
        <BookingForm />
      </ProtectedRoute>
    ),
  },

  {
    path: "/my-bookings",
    element: (
      <ProtectedRoute allowedRole="user">
        <MyBookings />
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;