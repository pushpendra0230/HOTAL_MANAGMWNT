import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    const { name, email, phone, age, gender, password } = formData;
    if (!name || !email || !phone || !age || !gender || !password) {
      alert("Please fill in all fields");
      return;
    }
    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:6001/user/signup",
        formData
      );
      alert("Signup successful!");
      navigate("/verification", { state: { email: formData.email } });
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      password: "",
    });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
      {/* Sidebar */}
      <div className="hidden lg:flex lg:w-1/3 h-full bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-700 text-white p-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          <h2 className="text-4xl font-semibold">Welcome!</h2>
          <p className="text-lg">Join us and experience seamless luxury and hospitality!</p>
          <img src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D" alt="Welcome" className="rounded-full w-60 h-60 object-cover" />
        </div>
      </div>

      {/* Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl text-center text-gray-800 font-semibold">SIGN UP</h2>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {/* Phone */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {/* Age */}
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {/* Gender */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-500 transition-all"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <NavLink to="/" className="text-indigo-600 hover:underline">
                Log In
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;