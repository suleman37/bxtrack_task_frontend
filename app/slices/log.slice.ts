import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { LogState } from "@/models/logState.model";
import { logApi } from "@/services/log.service";
import { DEFAULT_PAGE_LIMIT } from "@/utility/pagination";

const initialState: LogState = {
  logs: [],
  pagination: {
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(logApi.endpoints.getLogs.matchFulfilled, (state, action) => {
        state.logs = action.payload.logs;
        state.pagination = action.payload.pagination;
      });
  },
});

export const fetchLogs =
  (forceRefetch = false, page?: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentPage = page ?? state.logs.pagination.page;

    await dispatch(
      logApi.endpoints.getLogs.initiate(
        {
          page: currentPage,
          limit: DEFAULT_PAGE_LIMIT,
        },
        { forceRefetch }
      )
    ).unwrap();
  };

export const selectLogs = (state: RootState) => state.logs.logs;
export const selectLogsPagination = (state: RootState) => state.logs.pagination;
export default logSlice.reducer;
