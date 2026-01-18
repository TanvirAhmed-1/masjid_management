import { baseApi } from "../../api/baseApi";

const fridayCollectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFridayCollections: builder.query({
      query: (params) => ({
        url: "/friday-collections",
        params,
      }),
      providesTags: ["fridayCollection"],
    }),
    createFridayCollection: builder.mutation({
      query: (body) => ({
        url: "/friday-collections",
        method: "POST",
        body,
      }),
      invalidatesTags: ["fridayCollection"],
    }),
    updateFridayCollection: builder.mutation({
      query: ({ id, data }) => ({
        url: `/friday-collections/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["fridayCollection"],
    }),
    deleteFridayCollection: builder.mutation({
      query: (id: string) => ({
        url: `/friday-collections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fridayCollection"],
    }),
  }),
});

export const {
  useGetFridayCollectionsQuery,
  useCreateFridayCollectionMutation,
  useUpdateFridayCollectionMutation,
  useDeleteFridayCollectionMutation,
} = fridayCollectionApi;
