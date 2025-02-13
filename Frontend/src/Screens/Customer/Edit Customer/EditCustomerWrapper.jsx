import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import CustomerFormLayout from "../Layout/CustomerFormLayout";
import { useEditCustomerMutation, useGetSingleCustomerQuery } from "../../../Slice/customerSlice";
import React from "react";
import toasts from "../../../Toast/Toasts";

const EditCustomerWrapper = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [editCustomer] = useEditCustomerMutation();
  const { id } = useParams();
  const { data } = useGetSingleCustomerQuery({ token, id });

  // Initial values for the form
  const initialValues = {
    name: data?.data?.name || "",
    email: data?.data?.email || "",
    contactNumber: data?.data?.contactNumber || "",
    role: data?.data?.role || "",
  };

  const customerValidation = object({
    name: string().required("Name is required"),
    email: string().email("Invalid email format").required("Email is required"),
    contactNumber: string().min(10, "Mobile number must be at least 10 digits").required("Mobile number is required"),
    role: string().required("Role is required"),
  });

  // const handleSubmit = (values) => {
  //   editCustomer({ userData: values, id, token })
  //     .then((res) => {
  //       console.log(res);
  //       // toasts.successMsg("Customer Edited Successfully");
  //       toasts.successMsg("Customer added successfully")
  //       navigate("/layout/customer-list");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  const handleSubmit = async (values) => {
    try {
      const res = await editCustomer({ userData: values, id, token });
  
      if (res?.data) {
        toasts.successMsg("Customer Edited Successfully"); // ✅ Correct toast message
        navigate("/layout/customer-list");
      } else {
        toasts.errorMsg(res?.error?.data?.message || "Failed to edit customer"); // ✅ Handle error
      }
    } catch (err) {
      console.log(err);
      toasts.errorMsg("Something went wrong!"); // ✅ Error handling
    }
  };

  
  return (
    <Formik enableReinitialize initialValues={initialValues} validationSchema={customerValidation} onSubmit={handleSubmit}>
      {({ handleSubmit, ...formikProps }) => (
        <Form onSubmit={handleSubmit}>
          <CustomerFormLayout heading="Edit Customer" buttonName="Edit" formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default EditCustomerWrapper;
