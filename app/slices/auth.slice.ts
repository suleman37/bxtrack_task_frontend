import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import {
  removeAuthTokenCookie,
  setAuthTokenCookie,
} from '@/services/cookie.service';

type AuthState = {
  token: string | null;
  isLoggingOut: boolean;
};

const initialState: AuthState = {
  token: null,
  isLoggingOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggingOut = false;
      setAuthTokenCookie(action.payload);
    },
    clearToken(state) {
      state.token = null;
      state.isLoggingOut = false;
      removeAuthTokenCookie();
    },
    startLogout(state) {
      state.isLoggingOut = true;
    },
    finishLogout(state) {
      state.token = null;
      state.isLoggingOut = false;
      removeAuthTokenCookie();
    },
  },
});

export const { setToken, clearToken, startLogout, finishLogout } = authSlice.actions;
export const selectIsLoggingOut = (state: RootState) => state.auth.isLoggingOut;
export default authSlice.reducer;
