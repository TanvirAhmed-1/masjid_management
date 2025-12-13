import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setToken } from "../features/auth/authSlice";
import { removeTokenCookie } from "../server/storeCookies";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
  try {
    const baseUrl = "http://localhost:5000/api";
    const rawBaseQuery = fetchBaseQuery({
      baseUrl,
      credentials: "include",
      prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
          const formattedToken = `Bearer ${token}`;
          headers.set("Authorization", formattedToken);
        }

        return headers;
      },
    });

    let result = await rawBaseQuery(args, api, extraOptions);

    if (result?.error) {
      if (result.error.status === 401) {
        const refreshResult = await rawBaseQuery(
          { url: "/refresh-token", method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const newAccessToken = refreshResult.data as any;
          api.dispatch(setToken(newAccessToken?.result?.token));

          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
          await removeTokenCookie();
          if (typeof window !== "undefined") window.location.href = "/login";
        }
      }
    }

    return result;
  } catch (error) {
    console.error("Unexpected API Error:", error);
    return {
      error: { status: "FETCH_ERROR", data: "Unexpected error occurred" },
    };
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: dynamicBaseQuery,
  tagTypes: [
    "user",
    "ramadanYear",
    "itikaf",
    "ifterlist",
    "member",
    "payment",
    "fridayCollection",
    "CollectionDataSetUp",
    "othersCollection",
  ],
  endpoints: () => ({}),
});
