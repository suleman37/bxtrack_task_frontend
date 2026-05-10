import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { UserState } from "@/models/userState.model";
import { userApi } from "@/services/user.service";
import { DEFAULT_PAGE_LIMIT } from "@/utility/pagination";

const initialState: UserState = {
  users: [],
  pagination: {
    page: 1,
    limit: DEFAULT_PAGE_LIMIT,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      });
  },
});

export const fetchUsers =
  (forceRefetch = false, page?: number) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentPage = page ?? state.users.pagination.page;

    await dispatch(
      userApi.endpoints.getUsers.initiate(
        {
          page: currentPage,
          limit: DEFAULT_PAGE_LIMIT,
        },
        { forceRefetch }
      )
    ).unwrap();
  };

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersPagination = (state: RootState) => state.users.pagination;
export default userSlice.reducer;
