import { useNavigate } from "react-router-dom";
import { number, object, string } from "yup";
import toasts from "../../../Toast/Toasts";
import { Form, Formik } from "formik";
import ProductFormLayout from "../Layout/ProductFormLayout";
import { useAddProductMutation } from "../../../Slice/productSlice";
import React from "react";

const AddProductWrapper = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [addProduct] = useAddProductMutation();

  const initialvalues = {
    product_Name: "",
    category: "",
    mrp: "",
    rate: "",
  };

  const productValidation = object({
    product_Name: string().required("Name is required"),
    category: string().required("Category is required"),
    mrp: number().required("MRP is required"),
    rate: number().required("Rate is required"),
  });

  const handleSubmit = (values) => {
    addProduct({ productData: values, token })
      .then((res) => {
        if (res.data.status === "OK") {
          toasts.successMsg("Product added successfully");
          navigate("/layout/product-list");
        } else {
          toasts.errorMsg(res.data.msg || "Failed to add product");
        }
      })
      .catch((err) => {
        toasts.errorMsg("Error");
        console.log(err);
      });
  };

  return (
    <Formik initialValues={initialvalues} validationSchema={productValidation} onSubmit={handleSubmit}>
      {({ handleSubmit, ...formikProps }) => (
        <Form onSubmit={handleSubmit}>
          <ProductFormLayout heading={"Add Product"} buttonName="Add" formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default AddProductWrapper;
