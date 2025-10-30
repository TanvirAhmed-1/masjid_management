import { baseApi } from "../../api/baseApi";

const itikafApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItikaf: builder.query({
      query: () => ({
        url: "/itikafs",
        method: "GET",
      }),
      providesTags: ["ifterlist"],
    }),
    createItikaf: builder.mutation({
      query: (body) => ({
        url: "/itikafs",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ifterlist"],
    }),
    updateItikaf: builder.mutation({
      query: ({ id, data }) => ({
        url: `/itikafs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ifterlist"],
    }),
    deletedonername: builder.mutation({
      query: (id: string) => ({
        url: `/ifterlists/doner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ifterlist"],  
    }),
    deleteItikaf: builder.mutation({
      query: (id: string) => ({
        url: `/itikafs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ifterlist"],
    }),
  }),
});

export const {
  useGetItikafQuery,
  useCreateItikafMutation,
  useUpdateItikafMutation,
  useDeleteItikafMutation,
  useDeletedonernameMutation
} = itikafApi;
