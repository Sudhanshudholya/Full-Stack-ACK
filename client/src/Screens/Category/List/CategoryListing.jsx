import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import React from "react";

const CategoryListing = ({ data, onDelete }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (data?.data && Array.isArray(data.data)) {
      const calculatedPages = Math.ceil(data.data.length / itemsPerPage);
      setTotalPages(Math.max(1, calculatedPages));
      if (currentPage > calculatedPages) {
        setCurrentPage(calculatedPages);
      }
    }
  }, [data?.data?.length, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = data?.data?.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6">
      {location.pathname !== "/layout/category-list" ? (
        <Outlet />
      ) : (
        <div className="w-full max-w-4xl p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">Categories</h2>
            <Link to="add-category">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 rounded-lg shadow-md transition-all font-semibold mt-2 sm:mt-0">
                + Add Category
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border rounded-lg shadow-md overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-left">Category Name</th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {currentCategories?.length > 0 ? (
                  currentCategories.map((category) => (
                    <tr key={category._id} className="hover:bg-blue-100 transition-all border-b">
                      <td className="py-3 px-4 sm:py-4 sm:px-6 capitalize font-medium">{category.categoryname}</td>
                      <td className="py-3 px-4 sm:py-4 sm:px-6 flex justify-center gap-2 sm:gap-4">
                        <Link to={`edit-category/${category._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md transition-all">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md transition-all"
                          onClick={() => onDelete(category._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-6 text-gray-500 text-lg">
                      No categories available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
              <button
                className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all ${
                  currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg shadow-md font-semibold transition-all ${
                      currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all ${
                  currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryListing;
