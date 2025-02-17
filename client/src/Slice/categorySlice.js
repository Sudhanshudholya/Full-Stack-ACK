// // import apiSlice from "./apiSlice";

// import apiSlice from "./apiSlice";

// export const categorySlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

//     addCategory: builder.mutation({
//       query: ({ categoryData, token }) => ({
//         url: 'category/addcategory',
//         method: 'POST',
//         body: categoryData,
//         headers: { "x-access-token": token }
//       }),
//       invalidatesTags: ["category"]
//     }),

//     getCategory: builder.query({
//       query: ({ token }) => ({
//         url: 'category/getAllCategory',
//         method: 'GET',
//         headers: { "x-access-token": token },
//       }),
//       providesTags: ['category']
//     }),

//     getSingleCategory: builder.query({
//       query: ({ token, id }) => ({
//         url: `category/getSingleCategory/${id}`,
//         method: 'GET',
//         headers: { "x-access-token": token },
//       }),
//       providesTags: ['category']
//     }),

//     editCategory: builder.mutation({
//       query: ({ categoryData, id, token }) => ({
//         url: `category/editCategory/${id}`,
//         method: 'PUT',
//         body: categoryData,
//         headers: { "x-access-token": token },
//       }),
//       invalidatesTags: ['category']
//     }),
//   }),

  
// });

// export const { 
//   useAddCategoryMutation,
//   useGetCategoryQuery,
//   useGetSingleCategoryQuery,
//   useEditCategoryMutation,
// } = categorySlice;


import apiSlice from "./apiSlice";

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addCategory: builder.mutation({
      query: ({ categoryData, token }) => ({
        url: 'category/addcategory',
        method: 'POST',
        body: categoryData,
        headers: { "x-access-token": token }
      }),
      invalidatesTags: ["category"]
    }),

    getCategory: builder.query({
      query: ({ token }) => ({
        url: 'category/getAllCategory',
        method: 'GET',
        headers: { "x-access-token": token },
      }),
      providesTags: ['category']
    }),

    getSingleCategory: builder.query({
      query: ({ token, id }) => ({
        url: `category/getSingleCategory/${id}`,
        method: 'GET',
        headers: { "x-access-token": token },
      }),
      providesTags: ['category']
    }),

    editCategory: builder.mutation({
      query: ({ categoryData, id, token }) => ({
        url: `category/editCategory/${id}`,
        method: 'PUT',
        body: categoryData,
        headers: { "x-access-token": token },
      }),
      invalidatesTags: ['category']
    }),

    deleteCategory: builder.mutation({
      query: ({ id, token }) => ({
        url: `category/deleteCategory/${id}`,
        method: 'DELETE',
        headers: { "x-access-token": token },
      }),
      invalidatesTags: ['category']
    }),

  }),

});

export const { 
  useAddCategoryMutation,
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,  // ✅ Delete category mutation add kiya
} = categorySlice;
