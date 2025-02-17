import apiSlice from "./apiSlice";

export const customerSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({

    addCustomer: builder.mutation({
      query: ({ userData, token }) => ({
        url: '/users/addUser',
        method: 'POST',
        body: userData,
        headers: { "authorization": token },
      }),
      invalidatesTags: ['customer']
    }),

    getCustomer: builder.query({
      query: ({ token }) => ({
        url: '/users/getAllUsers',
        method: 'GET',
        headers: { "authorization": token },
      }),
      providesTags: ['customer']
    }),

    getSingleCustomer: builder.query({
      query: ({ token, id }) => ({
        url: `users/getUserById/${id}`,
        method: 'GET',
        headers: { "authorization": token },
      }),
      providesTags: ['customer']
    }),

    editCustomer: builder.mutation({
      query: ({ userData, id, token }) => ({
        url: `/users/updateUserDetails/${id}`,
        method: 'PUT',
        body: userData,
        headers: { "authorization": token },
      }),
      invalidatesTags: ['customer']
    }),

    deleteCustomer: builder.mutation({
      query: ({ id, token }) => ({
        url: `/users/deleteUser/${id}`,
        method: 'DELETE',
        headers: { "authorization": token },
      }),
      invalidatesTags: ['customer']
    }),

  }),
});

export const { 
  useAddCustomerMutation,
  useGetSingleCustomerQuery,
  useGetCustomerQuery, 
  useDeleteCustomerMutation,
  useEditCustomerMutation
} = customerSlice;
