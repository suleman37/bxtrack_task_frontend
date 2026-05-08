import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthTokenCookie } from '@/services/cookie.service';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAuthTokenCookie();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
