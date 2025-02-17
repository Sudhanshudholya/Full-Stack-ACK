import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import toasts from "../../../Toast/Toasts";
import { Form, Formik } from "formik";
import CustomerFormLayout from "../Layout/CustomerFormLayout";
import { useAddCustomerMutation } from "../../../Slice/customerSlice";
import React from "react";

const AddCustomerWrapper = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [addCustomer] = useAddCustomerMutation();

  const initialValues = {
    name: "",
    email: "",
    contactNumber: "",
    role: "",
  };

  const customerValidation = object({
    name: string()
      .required("Name is required")
      .transform((value) => value.toLocaleUpperCase()),
    email: string().email("Invalid email format").required("Email is required"),
    contactNumber: string().required("Contact number is required"),
    role: string().required("Role is required"),
  });

  const handleSubmit = (values) => {
    addCustomer({ userData: values, token })
      .then((res) => {
        if (res?.data?.msg) {
          toasts?.successMsg("Customer added successfully");
          navigate("/layout/customer-list");
        } else {
          toasts.errorMsg(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        toasts.errorMsg("Error");
      });
  };

  return (
    <Formik initialValues={initialValues} validationSchema={customerValidation} onSubmit={handleSubmit}>
      {({ handleSubmit, ...formikProps }) => (
        <Form onSubmit={handleSubmit}>
          <CustomerFormLayout heading="Add Customer" buttonName="Add" formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default AddCustomerWrapper;
