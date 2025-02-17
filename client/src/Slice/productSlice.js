// import apiSlice from "./apiSlice";

import apiSlice from "./apiSlice";

export const productSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({

    addProduct: builder.mutation({
      query: ({ productData, token }) => ({
        url: 'product/addProduct',
        method: 'POST',
        body: productData,
        headers: { "authorization": token },
      }),
      invalidatesTags: ['product']
    }),

    getProduct: builder.query({
      query: ({ token }) => ({
        url: 'product/getproduct',
        method: 'GET',
        headers: { "authorization": token },
      }),
      providesTags: ['product']
    }),

    getSingleProduct: builder.query({
      query: ({ token, id }) => ({
        url: `product/getSingleProduct/${id}`,
        method: 'GET',
        headers: { "authorization": token },
      }),
      providesTags: ['product']
    }),

    editProduct: builder.mutation({
      query: ({ productData, id, token }) => ({
        url: `product/updateProduct/${id}`,
        method: 'PUT',
        body: productData,
        headers: { "authorization": token },
      }),
      invalidatesTags: ['product']
    }),

    deleteProduct: builder.mutation({
      query: ({ id, token }) => ({
        url: `product/deleteProduct/${id}`,
        method: 'DELETE',
        headers: { "authorization": token },
      }),
      invalidatesTags: ['product']
    }),

  }),
});

export const { 
  useAddProductMutation,
  useGetSingleProductQuery,
  useGetProductQuery,
  useEditProductMutation,
  useDeleteProductMutation
} = productSlice;
