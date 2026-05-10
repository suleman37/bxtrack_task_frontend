import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isSuperAdminRole, normalizeUserRole } from "@/lib/auth";
import {
  getActingOrganizationIdCookie,
  getAuthRoleCookie,
  getAuthTokenCookie,
} from "@/services/cookie.service";

type StateWithAuth = { auth: { actingOrganizationId?: number } };

function resolveActingOrganizationId(getState: () => unknown): number | undefined {
  const fromState = (getState() as StateWithAuth).auth?.actingOrganizationId;
  if (fromState !== undefined) {
    return fromState;
  }
  const raw = getActingOrganizationIdCookie();
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getAuthTokenCookie();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    const role = normalizeUserRole(getAuthRoleCookie());
    const actingOrgId = resolveActingOrganizationId(getState);
    if (token && isSuperAdminRole(role) && actingOrgId !== undefined) {
      headers.set("X-Organization-Id", String(actingOrgId));
    }
    return headers;
  },
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  return rawBaseQuery(args, api, extraOptions);
};
