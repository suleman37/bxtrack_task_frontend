"use client";

import { useLayoutEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { setActingOrganizationId } from "@/app/slices/auth.slice";
import type { AppDispatch } from "@/app/store";
import { store } from "@/app/store";
import ToastProvider from "@/components/toaster";
import { isSuperAdminRole, normalizeUserRole } from "@/lib/auth";
import type { ProvidersProps } from "@/models/providersProps.model";
import {
  getActingOrganizationIdCookie,
  getAuthRoleCookie,
} from "@/services/cookie.service";

function ActingOrganizationHydration() {
  const dispatch = useDispatch<AppDispatch>();

  useLayoutEffect(() => {
    const role = normalizeUserRole(getAuthRoleCookie());
    if (!isSuperAdminRole(role)) return;
    const raw = getActingOrganizationIdCookie();
    if (!raw) return;
    const id = parseInt(raw, 10);
    if (!Number.isFinite(id) || id < 1) return;
    dispatch(setActingOrganizationId(id));
  }, [dispatch]);

  return null;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ToastProvider>
        <ActingOrganizationHydration />
        {children}
      </ToastProvider>
    </Provider>
  );
}
