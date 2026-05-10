import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { CustomerModel } from "@/models/customer.model";
import { customerApi } from "@/services/customer.service";

type CustomerState = {
  customers: CustomerModel[];
};

const initialState: CustomerState = {
  customers: [],
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      customerApi.endpoints.getCustomers.matchFulfilled,
      (state, action) => {
        state.customers = action.payload;
      }
    );
  },
});

export const fetchCustomers =
  (forceRefetch = false) =>
  async (dispatch: AppDispatch) => {
    await dispatch(
      customerApi.endpoints.getCustomers.initiate(undefined, { forceRefetch })
    ).unwrap();
};

export const selectCustomers = (state: RootState) => state.customers.customers;
export default customerSlice.reducer;
