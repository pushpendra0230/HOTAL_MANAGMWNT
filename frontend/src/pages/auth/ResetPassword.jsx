// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || ""; // Get the email from location state

//   const [otp, setOtp] = useState(""); // State for OTP input
//   const [newPassword, setNewPassword] = useState(""); // State for new password
//   const [errorMessage, setErrorMessage] = useState(""); // To store error messages
//   const [isLoading, setIsLoading] = useState(false); // For loading state

//   // Effect to reset error message when OTP or password changes
//   useEffect(() => {
//     setErrorMessage(""); // Clear error when inputs change
//   }, [otp, newPassword]);

//   // Function to handle password reset
//   const handleReset = async (e) => {
//     e.preventDefault();

//     // Frontend validation before submitting the form
//     if (!otp || !newPassword) {
//       setErrorMessage("Both OTP and password are required.");
//       return;
//     }

//     // Simple password length validation (Example: Minimum 8 characters)
//     if (newPassword.length < 8) {
//       setErrorMessage("Password must be at least 8 characters long.");
//       return;
//     }

//     setIsLoading(true); // Set loading state

//     try {
//       // Make API request to reset the password
//       const res = await axios.post("http://localhost:6001/user/reset-password", {
//         email,
//         otp,
//         newPassword,
//       });

//       // Success message
//       alert("Password changed successfully!");
//       navigate("/login"); // Redirect to login page
//     } catch (err) {
//       // Handle errors from the backend
//       const error = err?.response?.data?.message || "Reset failed, please try again.";
//       setErrorMessage(error); // Show the error message to the user
//     } finally {
//       setIsLoading(false); // Reset loading state
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form onSubmit={handleReset} className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

//         {/* Error message display */}
//         {errorMessage && (
//           <div className="text-red-500 mb-4">
//             <p>{errorMessage}</p>
//           </div>
//         )}

//         {/* OTP input */}
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full px-4 py-2 border rounded mb-4"
//           required
//         />

//         {/* New password input */}
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full px-4 py-2 border rounded mb-4"
//           required
//         />

//         {/* Submit button */}
//         <button
//           type="submit"
//           className="w-full py-2 bg-green-500 text-white rounded"
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Change Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;








import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setErrorMessage("");
  }, [otp, newPassword]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      setErrorMessage("Both OTP and password are required.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:6001/user/reset-password", {
        email,
        otp,
        password: newPassword,
      });

      alert("Password changed successfully!");
      navigate("/");
    } catch (err) {
      const error = err?.response?.data?.message || "Reset failed, please try again.";
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-white to-green-400 px-4">
      <form
        onSubmit={handleReset}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            OTP
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${isLoading
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {isLoading ? "Processing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;