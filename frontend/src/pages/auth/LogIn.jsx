import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all the fields");
      return;
    }
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:6001/user/login",
        formData
      );
      alert("Login successful!");
      localStorage.setItem("isLogin", true);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      <div className="w-[28rem] h-[36rem] rounded-3xl shadow-2xl flex flex-col items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="md:w-96 w-80 flex flex-col items-center justify-center p-8"
        >
          <h2 className="text-4xl text-gray-900 font-semibold">Log In</h2>
          <p className="text-sm text-gray-500 mt-3">Welcome back! Please sign in to continue</p>

          {/* Google login */}
          <button
            type="button"
            className="w-full mt-8 bg-gray-100 flex items-center justify-center h-12 rounded-full shadow-md hover:bg-gray-200 transition-all"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
              className="w-16 h-16"
            />
            <span className="ml-3 text-gray-700">Continue with Google</span>
          </button>

          {/* Email input */}
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-6">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Password input */}
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Remember me and forgot password */}
          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">
                Remember me
              </label>
            </div>

            {/* ✅ Corrected Forgot Password link */}
            <NavLink
              to="/forget-password"
              className="text-sm underline text-indigo-500 hover:text-indigo-600"
            >
              Forgot password?
            </NavLink>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="mt-8 w-full h-12 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition-all"
          >
            Login
          </button>

          {/* Sign-up link */}
          <p className="text-gray-500/80 text-sm mt-4">
            Don’t have an account?{" "}
            <a className="text-indigo-400 hover:underline" href="/sign-up">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;