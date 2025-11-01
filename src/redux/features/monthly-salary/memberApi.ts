import { baseApi } from "../../api/baseApi";

const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => ({
        url: "/members",
        method: "GET",
      }),
      providesTags: ["member"],
    }),
    createMember: builder.mutation({
      query: (body) => ({
        url: "/members",
        method: "POST",
        body,
      }),
      invalidatesTags: ["member"],
    }),
    deleteMember: builder.mutation({
      query: (id: string) => ({
        url: `/members/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["member"],
    }),
    updateMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/members/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["member"],
    }),
  }),
});
export const {
  useGetMembersQuery,
  useCreateMemberMutation,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} = memberApi;
