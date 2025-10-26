import { baseApi } from "../../api/baseApi";

const ramadanDataSetUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRamadanYear: builder.query({
      query: () => ({
        url: "/ramadan-data-setups",
        method: "GET",
      }),
      providesTags: ["ramadanYear"],
    }),

    createRamadanYear: builder.mutation({
      query: (body) => ({
        url: "/ramadan-data-setups",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ramadanYear"],
    }),

    // 🟢 UPDATE Ramadan year
    updateRamadanYear: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/ramadan-data-setups/${id}`,
        method: "PUT", 
        body,
      }),
      invalidatesTags: ["ramadanYear"],
    }),


    deleteRamadanYear: builder.mutation({
      query: (id: string) => ({
        url: `/ramadan-data-setups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ramadanYear"],
    }),
  }),

});

export const {
  useGetRamadanYearQuery,
  useCreateRamadanYearMutation,
  useUpdateRamadanYearMutation,
  useDeleteRamadanYearMutation,
} = ramadanDataSetUpApi;
