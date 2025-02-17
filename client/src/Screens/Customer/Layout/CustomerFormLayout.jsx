import { ErrorMessage } from "formik";
import ATMTextField from "../../../Components/Atoms/ATMtextField";
import React from "react";

const CustomerFormLayout = ({ formikProps, heading, buttonName }) => {
  const { values, handleChange, isSubmitting } = formikProps;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6">{heading}</h2>

        {/* Name */}
        <div className="mb-4">
          <ATMTextField
            label="Name"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="w-full text-sm sm:text-base"
          />
          <p className="text-red-400 text-xs sm:text-sm">
            <ErrorMessage name="name" />
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <ATMTextField
            label="Email"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="w-full text-sm sm:text-base"
          />
          <p className="text-red-400 text-xs sm:text-sm">
            <ErrorMessage name="email" />
          </p>
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <ATMTextField
            label="Contact Number"
            placeholder="Enter your Contact Number"
            name="contactNumber"
            value={values.contactNumber}
            onChange={handleChange}
            className="w-full text-sm sm:text-base"
          />
          <p className="text-red-400 text-xs sm:text-sm">
            <ErrorMessage name="contactNumber" />
          </p>
        </div>

        {/* Role */}
        <div className="mb-4">
          <ATMTextField
            label="Role"
            placeholder="Enter your role"
            name="role"
            value={values.role}
            onChange={handleChange}
            className="w-full text-sm sm:text-base"
          />
          <p className="text-red-400 text-xs sm:text-sm">
            <ErrorMessage name="role" />
          </p>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="border rounded bg-blue-600 w-full h-10 sm:h-12 p-2 font-light text-white text-base sm:text-lg transition-all duration-300 ease-in-out hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerFormLayout;
