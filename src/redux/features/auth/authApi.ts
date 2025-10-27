import { baseApi } from "../../api/baseApi";
import { setTokenCookie } from "../../server/storeCookies";
import { login } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token = data.result.token;
          const username = data.result.name;

          dispatch(login({ username, token }));
          await setTokenCookie(token);
        } catch (error) {
          console.error("Login failed:", error);
        }
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
      query: ({ id, data }) => ({
        url: `users/${id}`,
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
