import { baseApi } from "../../api/baseApi";

export const staffPaymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStaffPayments: builder.query({
      query: () => "/staff-salary-payments",
      providesTags: ["staffPayments"],
    }),
    createStaffPayment: builder.mutation({
      query: (body) => ({
        url: "/staff-salary-payments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["staffPayments"],
    }),
    updateStaffPayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staff-salary-payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["staffPayments"],
    }),
    deleteStaffPayment: builder.mutation({
      query: (id: string) => ({
        url: `/staff-salary-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staffPayments"],
    }),
  }),
});
export const {
  useGetStaffPaymentsQuery,
  useCreateStaffPaymentMutation,
  useUpdateStaffPaymentMutation,
  useDeleteStaffPaymentMutation,
} = staffPaymentsApi;
