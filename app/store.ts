import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/services/auth.service';
import { customerApi } from '@/services/customer.service';
import { logApi } from '@/services/log.service';
import { userApi } from '@/services/user.service';
import authReducer from './slices/auth.slice';
import customerReducer from './slices/customer.slice';
import logReducer from './slices/log.slice';
import userReducer from './slices/user.slice';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [logApi.reducerPath]: logApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    customers: customerReducer,
    logs: logReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      customerApi.middleware,
      logApi.middleware,
      userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
