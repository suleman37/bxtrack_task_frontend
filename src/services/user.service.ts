import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/constants/endpoints";
import type { UserModel } from "@/models/user.model";
import type { OrganizationFormType } from "@/schemas/organization.dto";
import type { UserFormType } from "@/schemas/user.dto";
import { showToastForMutation } from "@/utility/apiToast";
import { baseQuery } from "@/utility/baseQuery";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<UserModel[], void>({
      query: () => endpoints.users.getAll,
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
