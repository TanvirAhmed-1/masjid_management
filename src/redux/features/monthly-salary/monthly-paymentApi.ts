import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET Monthly Payments → /payments/monthly?monthKey=2025-01
    getMonthlyPayments: builder.query({
      query: (monthKey) => ({
        url: `/payments/monthly`,
        method: "GET",
        params: { monthKey },
      }),
      providesTags: ["payment"],
    }),

    // GET Member Payment Summary → /payments/summary/:memberId
    getMemberPaymentSummary: builder.query({
      query: (memberId) => ({
        url: `/payments/summary/${memberId}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),

    // GET All Members With Status → /payments/status/all
    getAllMembersStatus: builder.query({
      query: () => ({
        url: `/payments/status/all`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),

    // CREATE payment → POST /payments
    createPayment: builder.mutation({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["payment"],
    }),

    // UPDATE payment → PUT /payments/:id
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),

    // DELETE payment → DELETE /payments/:id
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payment"],
    }),

  }),
});

export const {
  useGetMonthlyPaymentsQuery,
  useGetMemberPaymentSummaryQuery,
  useGetAllMembersStatusQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = PaymentApi;
