import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  removeActingOrganizationIdCookie,
  removeAuthRoleCookie,
  removeAuthTokenCookie,
  setActingOrganizationIdCookie,
  setAuthTokenCookie,
} from '@/services/cookie.service';

type AuthState = {
  token: string | null;
  isLoggingOut: boolean;
  actingOrganizationId: number | null;
};

const initialState: AuthState = {
  token: null,
  isLoggingOut: false,
  actingOrganizationId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggingOut = false;
      state.actingOrganizationId = null;
      setAuthTokenCookie(action.payload);
      removeActingOrganizationIdCookie();
    },
    setActingOrganizationId(state, action: PayloadAction<number | null>) {
      const id = action.payload;
      state.actingOrganizationId = id;
      if (id !== null) {
        setActingOrganizationIdCookie(String(id));
      } else {
        removeActingOrganizationIdCookie();
      }
    },
    clearToken(state) {
      state.token = null;
      state.isLoggingOut = false;
      state.actingOrganizationId = null;
      removeAuthTokenCookie();
      removeAuthRoleCookie();
      removeActingOrganizationIdCookie();
    },
    startLogout(state) {
      state.isLoggingOut = true;
    },
    finishLogout(state) {
      state.token = null;
      state.isLoggingOut = false;
      state.actingOrganizationId = null;
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
