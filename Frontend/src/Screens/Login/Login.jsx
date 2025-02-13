import { ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import React from "react";

const Login = ({ formikProps }) => {
  const { values, handleChange, isSubmitting } = formikProps;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-blue-600">
      {/* Container */}
      <div className="w-[400px] flex flex-col bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800">Login</h1>

        {/* Username */}
        <div className="flex flex-col gap-1 mt-4">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <FaUser className="text-blue-600" />
            Username
          </label>
          <input
            type="text"
            name="username"
            value={values.userName}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none shadow-md"
          />
          <p className="text-red-600 text-sm">
            <ErrorMessage name="username" />
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 relative mt-4">
          <label className="text-gray-700 font-medium flex items-center gap-2">
            <RiLockPasswordFill className="text-blue-600" />
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none shadow-md"
          />
          <span
            className="absolute right-4 top-11 text-gray-500 cursor-pointer hover:text-blue-600 transition-all"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaRegEyeSlash />}
          </span>
          <p className="text-red-600 text-sm">
            <ErrorMessage name="password" />
          </p>
        </div>

        {/* Button */}
        <button
          className="mt-6 px-4 py-3 text-white cursor-pointer bg-blue-700 font-medium rounded-lg w-full hover:bg-blue-800 transition-all duration-300 shadow-md disabled:bg-gray-400"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
