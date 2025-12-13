import { baseApi } from "../../api/baseApi";
export const collectionSetUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollection: builder.query({
      query: () => "/other-collection",
      providesTags: ["othersCollection"],
    }),
    createCollection: builder.mutation({
      query: (body) => ({
        url: "/other-collection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["othersCollection"],
    }),
    updateCollection: builder.mutation({
      query: ({ id, data }) => ({
        url: `/other-collection/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["othersCollection"],
    }),
    deleteCollection: builder.mutation({
      query: (id: string) => ({
        url: `/other-collection/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["othersCollection"],
    }),
  }),
});

export const {
  useGetCollectionQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = collectionSetUpApi;
