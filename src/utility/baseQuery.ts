import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { isSuperAdminRole, normalizeUserRole } from "@/lib/auth";
import {
  getActingOrganizationIdCookie,
  getAuthRoleCookie,
  getAuthTokenCookie,
} from "@/services/cookie.service";

type StateWithAuth = { auth: { actingOrganizationId: number | null } };

function resolveActingOrganizationId(getState: () => unknown): number | null {
  const fromState = (getState() as StateWithAuth).auth?.actingOrganizationId;
  if (fromState !== undefined && fromState !== null) {
    return fromState;
  }
  const raw = getActingOrganizationIdCookie();
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
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
    if (token && isSuperAdminRole(role) && actingOrgId !== null) {
      headers.set("X-Organization-Id", String(actingOrgId));
    }
    return headers;
  },
});

function getApiMessage(payload: unknown, fallback: string) {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "message" in payload &&
    typeof payload.message === "string"
  ) {
    const message = payload.message.trim();

    if (message) {
      return message;
    }
  }

  return fallback;
}

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
