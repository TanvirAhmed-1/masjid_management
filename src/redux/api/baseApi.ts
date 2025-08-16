import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000`,
  prepareHeaders: (headers) => {
    const token = "";
    if (token) {
      headers.set("Authorization", JSON.parse(token));
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["user", "users"],
  endpoints: () => ({}),
});
