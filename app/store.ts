import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/services/auth.service';
import { customerApi } from '@/services/customer.service';
import { userApi } from '@/services/user.service';
import authReducer from './slices/auth.slice';
import customerReducer from './slices/customer.slice';
import userReducer from './slices/user.slice';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    customers: customerReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      customerApi.middleware,
      userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
