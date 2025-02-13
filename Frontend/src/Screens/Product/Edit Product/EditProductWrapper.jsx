import { useNavigate, useParams } from "react-router-dom"
import { object, string } from "yup"
import toasts from "../../../Toast/Toasts"
import { Form, Formik } from "formik"
import ProductFormLayout from "../Layout/ProductFormLayout"
import { useEditProductMutation, useGetSingleProductQuery } from "../../../Slice/productSlice"
import React from "react"

const EditProductWrapper = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem("Token")
  const [editProduct] = useEditProductMutation()
  const { id } = useParams()
  const { data } = useGetSingleProductQuery({ token, id })

  //Initial values for the form

  const initialValues = {
    product_Name: data?.data?.product_Name,
    category: data?.data?.category,
    mrp: data?.data?.mrp,
    rate: data?.data?.rate,
  }

  const productValidation = object({
    product_Name: string().required("Name is required"),
    category: string().required("Category is required"),
    mrp: string().required("MRP is required"),
    rate: string().required("Rate is required")
  })

  const handleSubmit = (values) => {
    editProduct({ productData: values, id, token })
      .then((res) => {
        if (res.data.status === "OK") {
          toasts.successMsg("Product edited successfully")
        }
        navigate("/layout/product-list")
      }).catch((err) => {
        toasts.errorMsg(err)
      })
  }
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={productValidation}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, ...formikProps }) =>
        <Form onSubmit={handleSubmit}>
          <ProductFormLayout heading={"Edit Customer"} buttonName="Edit" formikProps={formikProps} />
        </Form>
      }
    </Formik>
  )
}

export default EditProductWrapper
