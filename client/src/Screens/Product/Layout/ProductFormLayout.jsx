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
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-md">
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
                    <label htmlFor="category" className="block text-sm text-gray-700 mb-1">
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

                {/* MRP */}
                <div className="mb-4">
                    <ATMNumberField
                        label="MRP"
                        placeholder="Enter product MRP"
                        name="mrp"
                        value={values.mrp}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <p className='text-red-400'><ErrorMessage name='mrp' /></p>
                </div>

                {/* Rate */}
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
                        className="w-full bg-blue-600 text-white text-lg font-medium rounded-lg py-3 transition duration-300 hover:bg-blue-700 disabled:opacity-50"
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