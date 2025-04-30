import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Otp = () => {
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const res = await axios.post("http://localhost:6001/user/verifyOtp", {
        email,
        otp,
      });
      alert("OTP Verified Successfully!");
      navigate("/");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      await axios.post("http://localhost:6001/user/resend-otp", { email });
      alert("OTP resent successfully!");

      setTimer(30);
    } catch (error) {
      console.error("Resend OTP error:", error);
      alert(error.response?.data?.message || "Failed to resend OTP");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-300 to-yellow-200">
      <div className="max-w-md w-full p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col items-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-2">OTP Verification</h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          We sent a code to your registered email/phone
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <input
            type="text"
            name="otp"
            maxLength="6"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={handleChange}
            className="w-full px-5 py-4 border-2 border-purple-300 focus:border-purple-500 rounded-2xl focus:outline-none text-lg text-center tracking-widest bg-white"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg rounded-2xl transition-all duration-300"
          >
            Verify
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Didn't get the code?</p>
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className="text-sm text-purple-600 font-semibold hover:underline mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;