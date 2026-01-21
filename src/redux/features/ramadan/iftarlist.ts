import { baseApi } from "../../api/baseApi";

const ifterlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    itferlist: build.query({
      query: (params) => ({
        url: "/ifterlists",
        method: "GET",
        params,
      }),
      providesTags: ["ifterlist"],
    }),

    getifterlistbyid: build.query({
      query: (id: string) => ({
        url: `/ifterlists/${id}`,
        method: "GET",
      }),
      providesTags: ["ifterlist"],
    }),
    createifterlist: build.mutation({
      query: (body) => ({
        url: "/ifterlists",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ifterlist"],
    }),

    updateifterlist: build.mutation({
      query: ({ id, data }) => ({
        url: `/ifterlists/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ifterlist"],
    }),
    deleteifterlist: build.mutation({
      query: (id: string) => ({
        url: `/ifterlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ifterlist"],
    }),
  }),
});

export const {
  useItferlistQuery,
  useCreateifterlistMutation,
  useDeleteifterlistMutation,
  useUpdateifterlistMutation,
  useGetifterlistbyidQuery,
} = ifterlistApi;
