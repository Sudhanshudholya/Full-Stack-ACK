import Swal from "sweetalert2";
import CategoryListing from "./CategoryListing";
import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../../Slice/categorySlice";
import React from "react";

const CategoryListingWrapper = () => {
  
  const token = localStorage.getItem("Token");
  const { data } = useGetCategoryQuery({ token });
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleDelete = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this category?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
         await deleteCategory({ id: categoryId, token }); // This line seems incorrect and doesn't delete anything.
          Swal.fire("Deleted!", "The category has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "There was a problem deleting the category.", "error");
        }
      }
    });
  };

  return <CategoryListing data={data} onDelete={handleDelete} />;
};

export default CategoryListingWrapper;
