
import { baseApi } from "../../api/baseApi";

export const collectionDataSetUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCollectionDataSetUp: builder.query({
      query: () => "/collection-names",
        providesTags: ["CollectionDataSetUp"],
    }),
    createCollectionDataSetUp: builder.mutation({
      query: (body) => ({
        url: "/collection-names",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CollectionDataSetUp"],
    }),
    updateCollectionDataSetUp: builder.mutation({
      query: ({ id, data }) => ({
        url: `/collection-names/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CollectionDataSetUp"],
    }),
    deleteCollectionDataSetUp: builder.mutation({
      query: (id: string) => ({
        url: `/collection-names/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CollectionDataSetUp"],
    }), 
    }),
});
export const {
  useGetCollectionDataSetUpQuery,
  useCreateCollectionDataSetUpMutation,
  useUpdateCollectionDataSetUpMutation,
  useDeleteCollectionDataSetUpMutation,
} = collectionDataSetUpApi;