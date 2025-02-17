import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const BASE_URL = import.meta.env.VITE_API_URL

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/"}),
  tagTypes: ['customer', 'product', 'category'],
  endpoints: () => ({}), // You can add or inject endpoints later
});

export default apiSlice;
