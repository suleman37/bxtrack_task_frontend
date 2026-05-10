import { createApi } from '@reduxjs/toolkit/query/react';
import { endpoints } from "@/constants/endpoints"
import { baseQuery } from '@/utility/baseQuery';
import { showToastForMutation } from "@/utility/apiToast";

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (body) => ({
        url: endpoints.auth.login,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        await showToastForMutation(queryFulfilled);
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
export { authApi };
