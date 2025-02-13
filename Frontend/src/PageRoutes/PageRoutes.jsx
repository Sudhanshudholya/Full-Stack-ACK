import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Sidebar/Layout";
// import Auth from "../Components/Auth";
// import WithoutLogin from "../Components/WithoutLogin";
import LoginWrapper from "../Screens/Login/LoginWrapper";
import CustomerListingWrapper from "../Screens/Customer/List/CustomerListingWrapper";
import AddCustomerWrapper from "../Screens/Customer/Add Customer/AddCustomerWrapper";
import EditCustomerWrapper from "../Screens/Customer/Edit Customer/EditCustomerWrapper";
import ProductListingWrapper from "../Screens/Product/List/ProductListingWrapper";
import AddProductWrapper from "../Screens/Product/Add Product/AddProductWrapper";
import EditProductWrapper from "../Screens/Product/Edit Product/EditProductWrapper";
import CategoryListingWrapper from "../Screens/Category/List/CategoryListingWrapper";
import AddCategoryWrapper from "../Screens/Category/Add Category/AddCategoryWrapper";
import EditCategoryWrapper from "../Screens/Category/Edit Category/EditCategoryWrapper";
import React from "react";

const PageRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/", // Root path
      element: (
        // <WithoutLogin>
          <LoginWrapper />
        // </WithoutLogin>
      ), // Login page
    },
    {
      path: "/layout", // Layout path for the dashboard or main pages
      element: (
        // <Auth>
          <Layout />
        // </Auth>
      ), // Main layout that contains a sidebar
      children: [
        {
          path: "customer-list", // Customer listing page under layout
          element: <CustomerListingWrapper />,
        },
        {
          path: "customer-list/add-customer", // Path for adding a customer
          element: <AddCustomerWrapper />,
        },
        {
          path: "customer-list/edit-customer/:id", // Path for editing a customer by ID
          element: <EditCustomerWrapper />,
        },
        {
          path: "product-list", // Product listing page under layout
          element: <ProductListingWrapper />,
        },
        {
          path: "product-list/add-product", // Path for adding a product
          element: <AddProductWrapper />,
        },
        {
          path: "product-list/edit-product/:id", // Path for editing a product by ID
          element: <EditProductWrapper />,
        },
        {
          path: "category-list", // Category listing page under layout
          element: <CategoryListingWrapper />,
        },
        {
          path: "category-list/add-category", // Path for adding a category
          element: <AddCategoryWrapper />,
        },
        {
          path: "category-list/edit-category/:id", // Path for editing a category by ID
          element: <EditCategoryWrapper />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default PageRoutes;
