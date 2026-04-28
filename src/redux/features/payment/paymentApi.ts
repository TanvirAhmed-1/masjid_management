import { baseApi } from "../../api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveBkashCredentials: builder.mutation({
      query: (payload) => ({
        url: "/bkash-credentials",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["paymentCredentials"],
    }),
 
    getPaymentCredentials: builder.query({
      query: () => "/bkash-credentials",
      providesTags: ["paymentCredentials"],
    }),

    getDonationHistory: builder.query({
      query: (params) => ({
        url: "/history",
        method: "GET",
        params: params,
      }),
      providesTags: ["donations"],
    }),

    // ৪. নতুন ডোনেশন বা পেমেন্ট ইনিশিয়েট করা (যদি প্রয়োজন হয়)
    createPayment: builder.mutation({
      query: (payload) => ({
        url: "/create-payment", // আপনার ব্যাকএন্ডের পেমেন্ট ক্রিয়েট রাউট
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["donations"],
    }),
  }),
});

export const {
  useSaveBkashCredentialsMutation,
  useGetPaymentCredentialsQuery,
  useGetDonationHistoryQuery,
  useCreatePaymentMutation, // এটি নতুন যোগ করা হয়েছে
} = paymentApi;
