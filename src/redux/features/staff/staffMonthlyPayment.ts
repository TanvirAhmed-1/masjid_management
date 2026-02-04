import { baseApi } from "../../api/baseApi";

export const staffMonthlyPaymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStaffMonthlyPayment: build.query({
      query: (params) => ({
        url: "/monthly-salaries",
        method: "GET",
        params,
      }),
      providesTags: ["staffmonthlyPayments"],
    }),
    createStaffMonthlyPayment: build.mutation({
      query: (body) => ({
        url: "/monthly-salaries",
        method: "POST",
        body,
      }),
      invalidatesTags: ["staffmonthlyPayments"],
    }),
    updateStaffMonthlyPayment: build.mutation({
      query: ({ id, data }) => ({
        url: `/monthly-salaries/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["staffmonthlyPayments"],
    }),
    deleteStaffMonthlyPayment: build.mutation({
      query: (id: string) => ({
        url: `/monthly-salaries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staffmonthlyPayments"],
    }),
  }),
});

export const {
  useGetStaffMonthlyPaymentQuery,
  useCreateStaffMonthlyPaymentMutation,
  useUpdateStaffMonthlyPaymentMutation,
  useDeleteStaffMonthlyPaymentMutation,
} = staffMonthlyPaymentApi;
