import { baseApi } from "../../api/baseApi";

const itikafApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItikaf: builder.query({
      query: () => ({
        url: "/itikafs",
        method: "GET",
      }),
      providesTags: ["itikaf"],
    }),
    createItikaf: builder.mutation({
      query: (body) => ({
        url: "/itikafs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["itikaf"],
    }),
    updateItikaf: builder.mutation({
      query: ({ id, data }) => ({
        url: `/itikafs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["itikaf"],
    }),
    deleteItikaf: builder.mutation({
      query: (id: string) => ({
        url: `/itikafs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["itikaf"],
    }),
  }),
});

export const {
  useGetItikafQuery,
  useCreateItikafMutation,
  useUpdateItikafMutation,
  useDeleteItikafMutation,
} = itikafApi;
