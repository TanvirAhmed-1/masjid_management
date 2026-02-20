import { baseApi } from "../../api/baseApi";

export const mosqueMemberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMosqueMembers: builder.query({
      query: (query) => ({
        url: "/mosque/members",
        method: "GET",
        params: query,
      }),
      providesTags: ["mosqueMember"],
    }),
    createMosqueMember: builder.mutation({
      query: (memberData) => ({
        url: "/mosque/members",
        method: "POST",
        body: memberData,
      }),
      invalidatesTags: ["mosqueMember"],
    }),
    updateMosqueMember: builder.mutation({
      query: ({ memberId, memberData }) => ({
        url: `/mosque/members/${memberId}`,
        method: "PUT",
        body: memberData,
      }),
      invalidatesTags: ["mosqueMember"],
    }),
    deleteMosqueMember: builder.mutation({
      query: (memberId) => ({
        url: `/mosque/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mosqueMember"],
    }),
  }),
});

export const {
  useGetMosqueMembersQuery,
  useCreateMosqueMemberMutation,
  useUpdateMosqueMemberMutation,
  useDeleteMosqueMemberMutation,
} = mosqueMemberApi;
