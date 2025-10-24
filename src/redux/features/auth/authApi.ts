import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
login: builder.mutation({
  query: (body) => {
    console.log("Login body:", body); 
    return {
      url: "/login", 
      method: "POST",
      body,
    };
  },
  invalidatesTags: ["user"],
}),
    register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),
    getAllUsers: builder.query({
      query: () => "users",
      providesTags: ["user"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `users/${id}`, // backend PUT route এর সাথে match
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
} = authApi;
