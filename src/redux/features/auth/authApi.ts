import { baseApi } from "@/src/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/users/register",
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
      invalidatesTags: ["user"],
    }),

getAllUsers: builder.query({
  query: () => "/users",
  providesTags: ["user"], 
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
