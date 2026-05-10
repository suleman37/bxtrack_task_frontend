import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { CustomerState } from "@/models/customerState.model";
import { CUSTOMER_PAGE_SIZE, customerApi } from "@/services/customer.service";

const initialState: CustomerState = {
  customers: [],
  pagination: {
    page: 1,
    limit: CUSTOMER_PAGE_SIZE,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      customerApi.endpoints.getCustomers.matchFulfilled,
      (state, action) => {
        state.customers = action.payload.customers;
        state.pagination = action.payload.pagination;
      }
    );
  },
});

export const fetchCustomers =
  (forceRefetch = false, page?: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentPage = page ?? state.customers.pagination.page;

    await dispatch(
      customerApi.endpoints.getCustomers.initiate(
        {
          page: currentPage,
          limit: CUSTOMER_PAGE_SIZE,
        },
        { forceRefetch }
      )
    ).unwrap();
  };

export const selectCustomers = (state: RootState) => state.customers.customers;
export const selectCustomersPagination = (state: RootState) =>
  state.customers.pagination;
export default customerSlice.reducer;
