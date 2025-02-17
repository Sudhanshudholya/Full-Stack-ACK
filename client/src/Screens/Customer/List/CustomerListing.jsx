import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import React from "react";

const CustomerListing = ({ data, onDelete }) => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [data, totalPages]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = data?.data?.slice(indexOfFirstItem, indexOfLastItem) || [];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
            {location.pathname !== "/layout/customer-list" ? (
                <Outlet />
            ) : (
                <div className="w-full max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow-xl">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Customers</h2>
                        <Link to="add-customer">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto">
                                + Add Customer
                            </button>
                        </Link>
                    </div>

                    {/* Table Wrapper for Scroll */}
                    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                        <table className="w-full border-collapse min-w-[600px]">
                            <thead className="bg-blue-600 text-white text-base">
                                <tr>
                                    <th className="py-3 px-4 text-left">Name</th>
                                    <th className="py-3 px-4 text-left">Email</th>
                                    <th className="py-3 px-4 text-left">Contact Number</th>
                                    <th className="py-3 px-4 text-left">Role</th>
                                    <th className="py-3 px-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800">
                                {currentCustomers.length > 0 ? (
                                    currentCustomers.map((customer) => (
                                        <tr key={customer._id} className="border-b hover:bg-gray-100">
                                            <td className="py-3 px-4 capitalize">{customer.name}</td>
                                            <td className="py-3 px-4 lowercase">{customer.email}</td>
                                            <td className="py-3 px-4">{customer.contactNumber}</td>
                                            <td className="py-3 px-4 capitalize">{customer.role}</td>
                                            <td className="py-3 px-4 flex justify-center space-x-2">
                                                <Link to={`edit-customer/${customer._id}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md shadow">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow"
                                                    onClick={() => onDelete(customer._id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-5 text-gray-500">
                                            No Customers Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex flex-wrap justify-center items-center mt-6 space-x-2">
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-all ${
                                    currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerListing;
