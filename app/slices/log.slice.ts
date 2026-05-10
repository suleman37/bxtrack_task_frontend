import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { LogModel } from "@/models/log.model";
import { logApi } from "@/services/log.service";

type LogState = {
  logs: LogModel[];
};

const initialState: LogState = {
  logs: [],
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(logApi.endpoints.getLogs.matchFulfilled, (state, action) => {
        state.logs = action.payload;
      });
  },
});

export const fetchLogs =
  (forceRefetch = false) =>
  async (dispatch: AppDispatch) => {
    await dispatch(
      logApi.endpoints.getLogs.initiate(undefined, { forceRefetch })
    ).unwrap();
  };

export const selectLogs = (state: RootState) => state.logs.logs;
export default logSlice.reducer;
