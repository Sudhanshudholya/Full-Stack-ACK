// import { useNavigate } from "react-router-dom";
// import { object, string } from "yup";
// import toasts from "../../Toast/Toasts";
// import Login from "./Login";
// import { Form, Formik } from "formik";
// import { useLoginMutation } from "../../Slice/authSlice";
// import React from "react";

// const LoginWrapper = () => {
//   const navigate = useNavigate();
//   const [login] = useLoginMutation();

//   const initialValues = {
//     username: "",
//     password: "",
//   };

//   const validationSchema = object({
//     username: string().required("Email is required"),
//     password: string().required("Password is required"),
//   });

//   const handleSubmit = (values, { setSubmitting }) => {
//     login(values)
//       .then((res) => {
//         if (res.data.status === 'OK') {
//           localStorage.setItem("Token", res.data.data.token);
//           toasts.successMsg("Login Successfully");
//           navigate('/layout/customer-list');
//         } else {
//           toasts.errorMsg("Invalid Credential");
//         }
//       })
//       .catch((err) => {
//         toasts.errorMsg("Invalid credentials");
//         console.log(err);
//       })
//       .finally(() => {
//         setSubmitting(false);
//       });
//   };

//   return (
//     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//       {(formikProps) => (
//         <Form>
//           <Login formikProps={formikProps} />
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default LoginWrapper;

import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import toasts from "../../Toast/Toasts";
import Login from "./Login";
import { Form, Formik } from "formik";
import { useLoginMutation } from "../../Slice/authSlice";
import React from "react";

const LoginWrapper = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation(); // RTK Query mutation

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = object({
    username: string().required("Email is required"),
    password: string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await login(values).unwrap(); // ✅ unwrap() se actual response milega
      
      if (res.status === "OK") {
        localStorage.setItem("token", res.data.token); // ✅ Token store ho jayega
        toasts.successMsg("Login Successfully");
        navigate("/layout/customer-list"); // ✅ Redirect ho jayega
      } else {
        toasts.errorMsg("Invalid Credential");
      }
    } catch (error) {
      toasts.errorMsg("Invalid credentials");
      console.error("Login Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form>
          <Login formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default LoginWrapper;
