import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMemberPaymentSummary: builder.query({
      query: (memberId: string) => `/payments/member/${memberId}`,
      providesTags: ["payment"],
    }),

    getMonthlyPayments: builder.query({
      query: (monthKey: string) => `/payments/month/${monthKey}`,
      providesTags: ["payment"],
    }),

    getAllMembersPaymentStatus: builder.query({
      query: ({ year, page, limit }) => ({
        url: `/payments/summary/${year}`,
        params: { page, limit },
      }),
      providesTags: ["payment"],
    }),
    // Create, Update, Delete Mutations
    createPayment: builder.mutation({
      query: (payload) => ({
        url: "/payments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["payment"],
    }),
    getpayment: builder.query({
      query: (params) => ({
        url: `/payments`,
        params,
      }),
      providesTags: ["payment"],
    }),
    updatePayment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),

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
  useGetMemberPaymentSummaryQuery,
  useGetMonthlyPaymentsQuery,
  useGetAllMembersPaymentStatusQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetpaymentQuery,
} = paymentApi;
