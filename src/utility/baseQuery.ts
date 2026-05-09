import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { getAuthTokenCookie } from "@/services/cookie.service";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthTokenCookie();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const getApiMessage = (payload: any, fallback: string) => payload?.message?.trim() || fallback;
export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error) {
    toast.error(getApiMessage("data" in result.error , "Request failed"));
  } else {
    toast.success(getApiMessage(result.data, "Request successful"));
  }
  return result;
};
