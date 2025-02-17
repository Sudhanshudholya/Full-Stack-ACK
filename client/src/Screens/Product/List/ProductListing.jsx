import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import React from "react";

const ProductListing = ({ data, onDelete }) => {
  const location = useLocation();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (data?.data?.length > 0) {
      setTotalPages(Math.ceil(data.data.length / itemsPerPage));
    }
  }, [data]);

  const currentProducts = data?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-6xl p-4 sm:p-6 bg-white border border-gray-300 rounded-lg shadow-xl">
        {location.pathname === "/layout/product-list" && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">Product</h2>
              <Link to="add-product">
                <button className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded-lg shadow-md transition">
                  + Add Product
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg text-sm sm:text-base">
                <thead className="bg-blue-600 text-white">
                  <tr className="text-center">
                    <th className="py-2 sm:py-3 px-2 sm:px-4">Name</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">Category</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">MRP</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">Rate</th>
                    <th className="py-2 sm:py-3 px-2 sm:px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {currentProducts?.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr
                        key={product._id}
                        className="text-center border-b hover:bg-gray-100 transition"
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{product.product_Name}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 capitalize">{product.category}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{product.mrp}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4">{product.rate}</td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 flex justify-center gap-2 sm:gap-3">
                          <Link to={`edit-product/${product._id}`}>
                            <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg shadow-md transition">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                          </Link>
                          <button
                            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-2 sm:px-3 py-1 rounded-lg shadow-md transition"
                            onClick={() => onDelete(product._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4 sm:py-6 text-gray-500">
                        No products available...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
                <button
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer shadow-md transition ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-2 sm:px-3 py-1 rounded-lg cursor-pointer shadow-md transition ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer shadow-md transition ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default ProductListing;