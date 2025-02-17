import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}`}),
  tagTypes: ['customer', 'product', 'category'],
  endpoints: () => ({}), // You can add or inject endpoints later
});

export default apiSlice;
