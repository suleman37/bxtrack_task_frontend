import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@/app/store";
import type { UserModel } from "@/models/user.model";
import { userApi } from "@/services/user.service";

type UserState = {
  users: UserModel[];
};

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUsers.matchFulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const fetchUsers =
  (forceRefetch = false) =>
  async (dispatch: AppDispatch) => {
    await dispatch(
      userApi.endpoints.getUsers.initiate(undefined, { forceRefetch })
    ).unwrap();
  };

export const selectUsers = (state: RootState) => state.users.users;
export default userSlice.reducer;
