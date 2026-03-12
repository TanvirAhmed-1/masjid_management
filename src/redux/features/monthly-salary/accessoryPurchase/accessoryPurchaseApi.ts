import { baseApi } from "@/src/redux/api/baseApi";

export const accessoryPurchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccessoryPurchases: builder.query({
      query: (params) => ({
        url: "/accessory-purchases",
        method: "GET",
        params: params,
      }),
      providesTags: ["AccessoryPurchases"],
    }),
    addAccessoryPurchase: builder.mutation({
      query: (data) => ({
        url: "/accessory-purchases",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AccessoryPurchases"],
    }),
    updateAccessoryPurchase: builder.mutation({
      query: ({ id, data }) => ({
        url: `/accessory-purchases/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AccessoryPurchases"],
    }),
    deleteAccessoryPurchase: builder.mutation({
      query: (id) => ({
        url: `/accessory-purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AccessoryPurchases"],
    }),
  }),
});

export const {
  useGetAccessoryPurchasesQuery,
  useAddAccessoryPurchaseMutation,
  useUpdateAccessoryPurchaseMutation,
  useDeleteAccessoryPurchaseMutation,
} = accessoryPurchaseApi;
