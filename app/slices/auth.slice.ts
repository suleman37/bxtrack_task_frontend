import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import type { AuthState } from '@/models/authState.model';
import {
  removeActingOrganizationIdCookie,
  removeAuthRoleCookie,
  removeAuthTokenCookie,
  setActingOrganizationIdCookie,
  setAuthTokenCookie,
} from '@/services/cookie.service';

const initialState: AuthState = {
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggingOut = false;
      state.actingOrganizationId = undefined;
      setAuthTokenCookie(action.payload);
      removeActingOrganizationIdCookie();
    },
    setActingOrganizationId(state, action: PayloadAction<number | undefined>) {
      const id = action.payload;
      state.actingOrganizationId = id;
      if (id !== undefined) {
        setActingOrganizationIdCookie(String(id));
      } else {
        removeActingOrganizationIdCookie();
      }
    },
    clearToken(state) {
      state.token = undefined;
      state.isLoggingOut = false;
      state.actingOrganizationId = undefined;
      removeAuthTokenCookie();
      removeAuthRoleCookie();
      removeActingOrganizationIdCookie();
    },
    startLogout(state) {
      state.isLoggingOut = true;
    },
    finishLogout(state) {
      state.token = undefined;
      state.isLoggingOut = false;
      state.actingOrganizationId = undefined;
      removeAuthTokenCookie();
      removeAuthRoleCookie();
      removeActingOrganizationIdCookie();
    },
  },
});

export const {
  setToken,
  setActingOrganizationId,
  clearToken,
  startLogout,
  finishLogout,
} = authSlice.actions;
export const selectIsLoggingOut = (state: RootState) => state.auth.isLoggingOut;
export const selectActingOrganizationId = (state: RootState) =>
  state.auth.actingOrganizationId;
export default authSlice.reducer;
