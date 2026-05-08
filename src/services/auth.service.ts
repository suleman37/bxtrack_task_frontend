import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from "@/constants/endpoints"
import { baseQuery } from '@/utility/baseQuery';

const authApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (body) => ({
        url: endpoints.auth.login,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
export { authApi };
