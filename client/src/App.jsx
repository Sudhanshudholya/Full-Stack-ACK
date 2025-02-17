import PageRoutes from "./PageRoutes/PageRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

export default function App() {
  return (
   <>
    <PageRoutes/> 
     <ToastContainer/>
   </>
  )
}