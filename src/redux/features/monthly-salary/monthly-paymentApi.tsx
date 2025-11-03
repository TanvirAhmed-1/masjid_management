import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query({
      query: () => ({
        url: "/payments",
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    getMemberPaymentSummary: builder.query({
      query: (memberId: string) => ({
        url: `/payments/${memberId}`,
        method: "GET",
      }),
      providesTags: ["payment"],
    }),
    createPayment: builder.mutation({
      query: (body) => ({
        url: "/payments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["payment"],
    }),
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/payments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["payment"],
    }),
    deletePayment: builder.mutation({
      query: (id: string) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const {
  useGetPaymentQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetMemberPaymentSummaryQuery,
} = PaymentApi;
