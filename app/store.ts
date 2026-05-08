import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/services/auth.service';
import { userApi } from '@/services/user.service';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
