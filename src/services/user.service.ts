import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/constants/endpoints";
import type { UserModel } from "@/models/user.model";
import type { UserFormType } from "@/schemas/user.dto";
import { baseQuery } from "@/utility/baseQuery";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query<UserModel[], void>({
      query: () => endpoints.users.getAll,
    }),
    createUser: builder.mutation({
      query: (body: UserFormType) => ({
        url: endpoints.users.create,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery } = userApi;
export { userApi };
