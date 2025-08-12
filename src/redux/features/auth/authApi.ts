import { baseApi } from "@/src/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/users/register", // তোমার backend register route
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),

getAllUsers: builder.query({
  query: () => "/users",
  providesTags: ["users"],  // বেশি উপযুক্ত
}),

    updateUserProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/profile/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  // useGetUserProfileQuery,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
} = authApi;
