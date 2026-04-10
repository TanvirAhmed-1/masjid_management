import { baseApi } from "../../api/baseApi";

export const mosqueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMosque: builder.query({
      query: () => "/get-mosque",
      providesTags: ["mosque"],
    }),
    updateMosque: builder.mutation({
      query: (data) => ({
        url: "/update-mosque",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["mosque"],
    }),
  }),
});

export const { useGetMosqueQuery, useUpdateMosqueMutation } = mosqueApi;
