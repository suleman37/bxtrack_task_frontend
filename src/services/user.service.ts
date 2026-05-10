import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/constants/endpoints";
import type { UserListModel, UserModel } from "@/models/user.model";
import type { OrganizationFormType } from "@/schemas/organization.dto";
import type { UserFormType } from "@/schemas/user.dto";
import { showToastForMutation } from "@/utility/apiToast";
import { baseQuery } from "@/utility/baseQuery";
import {
  DEFAULT_PAGE_LIMIT,
  resolvePagination,
} from "@/utility/pagination";

type UserQueryParams = {
  page?: number;
  limit?: number;
};

type RawUser = Partial<UserModel> & {
  created_by_id?: number | null;
  organization_id?: number | null;
  organization_name?: string | null;
};

type RawUsersResponse =
  | RawUser[]
  | {
      data?: unknown;
      users?: unknown;
      items?: unknown;
      rows?: unknown;
      results?: unknown;
    };

function resolveUsers(payload: RawUsersResponse): RawUser[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.data)) {
    return payload.data as RawUser[];
  }

  if (Array.isArray(payload.users)) {
    return payload.users as RawUser[];
  }

  if (Array.isArray(payload.items)) {
    return payload.items as RawUser[];
  }

  if (Array.isArray(payload.rows)) {
    return payload.rows as RawUser[];
  }

  if (Array.isArray(payload.results)) {
    return payload.results as RawUser[];
  }

  if (typeof payload.data === "object" && payload.data !== null) {
    return resolveUsers(payload.data as RawUsersResponse);
  }

  return [];
}

function mapUser(user: RawUser): UserModel {
  return {
    id: typeof user.id === "number" ? user.id : Number(user.id) || 0,
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role ?? "",
    createdById: user.createdById ?? user.created_by_id ?? null,
    organizationId: user.organizationId ?? user.organization_id ?? null,
    organizationName:
      user.organizationName ?? user.organization_name ?? null,
  };
}

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<UserListModel, UserQueryParams | void>({
      query: (params) => ({
        url: endpoints.users.getAll,
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? DEFAULT_PAGE_LIMIT,
        },
      }),
      transformResponse: (response: RawUsersResponse, _meta, arg) => {
        const page = arg?.page ?? 1;
        const limit = arg?.limit ?? DEFAULT_PAGE_LIMIT;
        const users = resolveUsers(response).map(mapUser);

        return {
          users,
          pagination: resolvePagination(response, users.length, page, limit),
        };
      },
    }),
    createUser: builder.mutation({
      query: (body: UserFormType | OrganizationFormType) => ({
        url: endpoints.users.create,
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        await showToastForMutation(queryFulfilled);
      },
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery } = userApi;
export { userApi };
