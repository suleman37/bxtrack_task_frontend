"use client";

import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { setActingOrganizationId } from "@/app/slices/auth.slice";
import type { AppDispatch } from "@/app/store";
import { store } from "@/app/store";
import { isSuperAdminRole, normalizeUserRole } from "@/lib/auth";
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

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ActingOrganizationHydration />
      {children}
    </Provider>
  );
}
