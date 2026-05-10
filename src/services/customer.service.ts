import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/constants/endpoints";
import type { CustomerModel } from "@/models/customer.model";
import type { CustomerFormType } from "@/schemas/customer.dto";
import { baseQuery } from "@/utility/baseQuery";

const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery,
  endpoints: (builder) => ({
    getCustomers: builder.query<CustomerModel[], void>({
      query: () => endpoints.customers.getAll,
    }),
    createCustomer: builder.mutation({
      query: (body: CustomerFormType) => ({
        url: endpoints.customers.create,
        method: "POST",
        body,
      }),
    }),
    createCustomerNote: builder.mutation<
      void,
      { customerId: number; notes: string }
    >({
      query: ({ customerId, ...body }) => ({
        url: endpoints.customers.createNote.replace(":id", String(customerId)),
        method: "POST",
        body,
      }),
    }),
    deleteCustomer: builder.mutation<void, number>({
      query: (id) => ({
        url: endpoints.customers.delete.replace(":id", String(id)),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useCreateCustomerNoteMutation,
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} = customerApi;
export { customerApi };
