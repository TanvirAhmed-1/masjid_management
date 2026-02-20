import { baseApi } from "../../api/baseApi";

export const mosqueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMosques: builder.query({
      query: () => "/mosques",
      providesTags: ["mosque"],
    }),
    createMosque: builder.mutation({
      query: (mosqueData) => ({
        url: "/mosques",
        method: "POST",
        body: mosqueData,
      }),
      invalidatesTags: ["mosque"],
    }),
    updateMosque: builder.mutation({
      query: ({ mosqueId, mosqueData }) => ({
        url: `/mosques/${mosqueId}`,
        method: "PUT",
        body: mosqueData,
      }),
      invalidatesTags: ["mosque"],
    }),
    deleteMosque: builder.mutation({
      query: (mosqueId) => ({
        url: `/mosques/${mosqueId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mosque"],
    }),
  }),
});
export const {
  useGetMosquesQuery,
  useCreateMosqueMutation,
  useUpdateMosqueMutation,
  useDeleteMosqueMutation,
} = mosqueApi;
