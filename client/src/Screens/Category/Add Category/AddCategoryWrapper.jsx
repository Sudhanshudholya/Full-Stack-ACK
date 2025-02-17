import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import toasts from "../../../Toast/Toasts";
import CategoryFormLayout from "../Layout/CategoryFormLayout";
import { useAddCategoryMutation } from "../../../Slice/categorySlice";
import React from "react";

const AddCategoryWrapper = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [addCategory] = useAddCategoryMutation();

  const initialValues = {
    categoryname: "",
  };

  const categoryValidation = object({
    categoryname: string().required("Category is required"),
  });

  const handleSubmit = (values) => {
    addCategory({ categoryData: values, token })
      .then((res) => {
        console.log("Response:", res);
        if (res.data?.status === "OK") {
          toasts.successMsg("Category added successfully");
          navigate("/layout/category-list");
        } else {
          toasts.errorMsg(res.data?.msg || "Failed to add category");
        }
      })
      .catch((err) => {
        toasts.errorMsg("Error");
        console.log("Error:", err);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={categoryValidation}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, ...formikProps }) => (
        <Form onSubmit={handleSubmit}>
          <CategoryFormLayout
            heading="Add Category"
            buttonName="Add"
            formikProps={formikProps}
          />
        </Form>
      )}
    </Formik>
  );
};

export default AddCategoryWrapper;
