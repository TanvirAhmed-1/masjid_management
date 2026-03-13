import { baseApi } from "../../api/baseApi";

const tarabiPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTarabiPayment: builder.query({
      query: (params) => ({
        url: `/tarabi-payments`,
        params,
      }),
      providesTags: ["tarabiPayment"],
    }),
    createTarabiPayment: builder.mutation({
      query: (body) => ({
        url: `/tarabi-payments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["tarabiPayment"],
    }),
    updateTarabiPayment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tarabi-payments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["tarabiPayment"],
    }),
    deleteTarabiPayment: builder.mutation({
      query: (id) => ({
        url: `/tarabi-payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tarabiPayment"],
    }),
  }),
});

export const {
  useGetTarabiPaymentQuery,
  useCreateTarabiPaymentMutation,
  useUpdateTarabiPaymentMutation,
  useDeleteTarabiPaymentMutation,
} = tarabiPaymentApi;
