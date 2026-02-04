import { baseApi } from "@/src/redux/api/baseApi";

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffList: builder.query({
      query: (params) => ({
        url: "/staffs",
        params,
      }),
      providesTags: ["staff"],
    }),
    createStaff: builder.mutation({
      query: (body) => ({
        url: "/staffs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["staff"],
    }),
    updateStaff: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staffs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
    staffStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staffs/status/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["staff"],
    }),
    deleteStaff: builder.mutation({
      query: (id: string) => ({
        url: `/staffs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),
  }),
});
export const {
  useGetStaffListQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useStaffStatusMutation
} = staffApi;
