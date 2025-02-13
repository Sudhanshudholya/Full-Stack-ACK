import { ErrorMessage } from "formik";
import ATMNumberField from "../../../Components/Atoms/ATMNumberField";
import ATMTextField from "../../../Components/Atoms/ATMtextField";
import { useGetCategoryQuery } from "../../../Slice/categorySlice";
import React from "react";

const ProductFormLayout = ({ formikProps, heading, buttonName }) => {
    
    const { values, handleChange, isSubmitting } = formikProps;
    const token = localStorage.getItem("Token");
    const { data } = useGetCategoryQuery({ token });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-6">{heading}</h2>

                {/* Product Name */}
                <div className="mb-4">
                    <ATMTextField
                        label="Product Name"
                        placeholder="Enter product name"
                        name="product_Name"
                        value={values.product_Name}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <p className='text-red-400'><ErrorMessage name='product_Name' /></p>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <div>
                        <label htmlFor="category" className="block text-sm text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            {data?.data?.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.categoryname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* MRP */}
                <div className="mb-4">
                    <ATMNumberField
                        label="MRP"
                        placeholder="Enter product mrp"
                        name="mrp"
                        value={values.mrp}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <p className='text-red-400'><ErrorMessage name='mrp' /></p>
                </div>

                {/* RATE */}
                <div className="mb-4">
                    <ATMNumberField
                        label="Rate"
                        placeholder="Enter product rate"
                        name="rate"
                        value={values.rate}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <p className='text-red-400'><ErrorMessage name='rate' /></p>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="border rounded bg-blue-600 w-full h-12 p-2 font-light text-xl text-white"
                        disabled={isSubmitting}
                    >
                        {buttonName}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductFormLayout;
