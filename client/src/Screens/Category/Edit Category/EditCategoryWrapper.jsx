import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { object, string } from "yup";
import toasts from "../../../Toast/Toasts";
import CategoryFormLayout from "../Layout/CategoryFormLayout";
import { useEditCategoryMutation, useGetSingleCategoryQuery } from "../../../Slice/categorySlice";
import React from "react";

const EditCategoryWrapper = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");
    const [editCategory] = useEditCategoryMutation();
    const { id } = useParams();
    const { data } = useGetSingleCategoryQuery({ token, id });

    const initialValues = {
        categoryname: data?.data?.categoryname || "",
    };

    const categoryValidation = object({
        categoryname: string().required("Name is required"),
    });

    const handleSubmit = (values) => {
        editCategory({ categoryData: values, id, token })
            .then((res) => {
                if (res.data?.msg) {
                    toasts.successMsg("Category edited successfully");
                }
                navigate("/layout/category-list");
            })
            .catch((err) => {
                toasts.errorMsg(err);
            });
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={categoryValidation}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, ...formikProps }) => (
                <Form onSubmit={handleSubmit}>
                    <CategoryFormLayout heading="Edit Category" buttonName="Edit" formikProps={formikProps} />
                </Form>
            )}
        </Formik>
    );
};

export default EditCategoryWrapper;
