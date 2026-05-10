import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/constants/endpoints";
import type {
  CustomerListModel,
  CustomerModel,
  CustomerPaginationModel,
} from "@/models/customer.model";
import type { CustomerFormType } from "@/schemas/customer.dto";
import { showToastForMutation } from "@/utility/apiToast";
import { baseQuery } from "@/utility/baseQuery";

const CUSTOMER_PAGE_SIZE = 10;

type RawCustomer = {
  id?: number | string;
  name?: string;
  email?: string;
  phone?: string | number;
  assignedToName?: string;
  assigned_to_name?: string;
  status?: string;
  assignedTo?:
    | string
    | number
    | {
        name?: string;
      };
  assigned_to?:
    | string
    | number
    | {
        name?: string;
      };
};

type RawCustomerCollection = {
  data?: unknown;
  customers?: unknown;
  items?: unknown;
  rows?: unknown;
  results?: unknown;
  page?: unknown;
  currentPage?: unknown;
  limit?: unknown;
  perPage?: unknown;
  total?: unknown;
  totalItems?: unknown;
  totalCount?: unknown;
  totalPages?: unknown;
  lastPage?: unknown;
  hasNextPage?: unknown;
  hasPreviousPage?: unknown;
  hasPrevPage?: unknown;
  hasNext?: unknown;
  hasPrev?: unknown;
  pagination?: unknown;
  meta?: unknown;
};

type RawCustomersResponse = RawCustomer[] | RawCustomerCollection;

type CustomerQueryParams = {
  page?: number;
  limit?: number;
};

function getCustomerListFromRecord(record: RawCustomerCollection): RawCustomer[] {
  if (Array.isArray(record.data)) {
    return record.data as RawCustomer[];
  }

  if (Array.isArray(record.customers)) {
    return record.customers as RawCustomer[];
  }

  if (Array.isArray(record.items)) {
    return record.items as RawCustomer[];
  }

  if (Array.isArray(record.rows)) {
    return record.rows as RawCustomer[];
  }

  if (Array.isArray(record.results)) {
    return record.results as RawCustomer[];
  }

  if (
    typeof record.data === "object" &&
    record.data !== null
  ) {
    return getCustomerListFromRecord(record.data as RawCustomerCollection);
  }

  return [];
}

function resolveCustomers(payload: RawCustomersResponse): RawCustomer[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  return getCustomerListFromRecord(payload);
}

function toPositiveNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return fallback;
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  return fallback;
}

function getPaginationRecord(payload: RawCustomersResponse): RawCustomerCollection | null {
  if (Array.isArray(payload)) {
    return null;
  }

  if (typeof payload.pagination === "object" && payload.pagination !== null) {
    return payload.pagination as RawCustomerCollection;
  }

  if (typeof payload.meta === "object" && payload.meta !== null) {
    return payload.meta as RawCustomerCollection;
  }

  if (
    typeof payload.data === "object" &&
    payload.data !== null &&
    !Array.isArray(payload.data)
  ) {
    return payload.data as RawCustomerCollection;
  }

  return payload;
}

function resolvePagination(
  payload: RawCustomersResponse,
  customerCount: number,
  requestedPage: number,
  requestedLimit: number
): CustomerPaginationModel {
  const source = getPaginationRecord(payload);

  if (!source) {
    return {
      page: requestedPage,
      limit: requestedLimit,
      total: customerCount,
      totalPages: customerCount > 0 ? 1 : 1,
      hasNextPage: false,
      hasPreviousPage: requestedPage > 1,
    };
  }

  const page = toPositiveNumber(
    source.page ?? source.currentPage,
    requestedPage
  );
  const limit = toPositiveNumber(
    source.limit ?? source.perPage,
    requestedLimit
  );
  const total = toPositiveNumber(
    source.total ?? source.totalItems ?? source.totalCount,
    customerCount
  );
  const totalPages = toPositiveNumber(
    source.totalPages ?? source.lastPage,
    Math.max(1, Math.ceil(total / limit))
  );
  const hasPreviousPage = toBoolean(
    source.hasPreviousPage ?? source.hasPrevPage ?? source.hasPrev,
    page > 1
  );
  const hasNextPage = toBoolean(
    source.hasNextPage ?? source.hasNext,
    page < totalPages
  );

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}

function resolveAssignedToName(customer: RawCustomer): string {
  if (typeof customer.assignedToName === "string") {
    return customer.assignedToName;
  }

  if (typeof customer.assigned_to_name === "string") {
    return customer.assigned_to_name;
  }

  if (
    typeof customer.assignedTo === "object" &&
    customer.assignedTo !== null &&
    typeof customer.assignedTo.name === "string"
  ) {
    return customer.assignedTo.name;
  }

  if (
    typeof customer.assigned_to === "object" &&
    customer.assigned_to !== null &&
    typeof customer.assigned_to.name === "string"
  ) {
    return customer.assigned_to.name;
  }

  return "";
}

function mapCustomer(customer: RawCustomer): CustomerModel {
  return {
    id: typeof customer.id === "number" ? customer.id : Number(customer.id) || 0,
    name: customer.name ?? "",
    email: customer.email ?? "",
    phone:
      typeof customer.phone === "string"
        ? customer.phone
        : customer.phone !== undefined
          ? String(customer.phone)
          : "",
    assignedToName: resolveAssignedToName(customer),
    status: customer.status,
  };
}

const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery,
  endpoints: (builder) => ({
    getCustomers: builder.query<CustomerListModel, CustomerQueryParams | void>({
      query: (params) => ({
        url: endpoints.customers.getAll,
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? CUSTOMER_PAGE_SIZE,
        },
      }),
      transformResponse: (
        response: RawCustomersResponse,
        _meta,
        arg
      ): CustomerListModel => {
        const page = arg?.page ?? 1;
        const limit = arg?.limit ?? CUSTOMER_PAGE_SIZE;
        const customers = resolveCustomers(response).map(mapCustomer);

        return {
          customers,
          pagination: resolvePagination(response, customers.length, page, limit),
        };
      },
    }),
    createCustomer: builder.mutation({
      query: (body: CustomerFormType) => ({
        url: endpoints.customers.create,
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        await showToastForMutation(queryFulfilled);
      },
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
      async onQueryStarted(_arg, { queryFulfilled }) {
        await showToastForMutation(queryFulfilled);
      },
    }),
    deleteCustomer: builder.mutation<void, number>({
      query: (id) => ({
        url: endpoints.customers.delete.replace(":id", String(id)),
        method: "DELETE",
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        await showToastForMutation(queryFulfilled);
      },
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
export { CUSTOMER_PAGE_SIZE };
