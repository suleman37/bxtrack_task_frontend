"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearToken,
  selectActingOrganizationId,
  setActingOrganizationId,
} from "@/app/slices/auth.slice";
import { fetchCustomers } from "@/app/slices/customer.slice";
import { fetchLogs } from "@/app/slices/log.slice";
import { fetchUsers } from "@/app/slices/user.slice";
import type { AppDispatch } from "@/app/store";
import { R } from "@/constants/R";
import { isSuperAdminPath, isSuperAdminRole, normalizeUserRole } from "@/lib/auth";
import { getAuthRoleCookie } from "@/services/cookie.service";
import { getSidebarNavItems } from "@/src/components/sidebar/navItems";

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function useProtectedShell() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const actingOrganizationId = useSelector(selectActingOrganizationId);
  const [isPending, startTransition] = useTransition();
  const sidebarNavItems = getSidebarNavItems(pathname);
  const activeItem =
    sidebarNavItems.find((item) => isActivePath(pathname, item.href)) ??
    sidebarNavItems[0];
  const currentRole = normalizeUserRole(getAuthRoleCookie());
  const canReturnToSuperAdmin =
    !isSuperAdminPath(pathname) && isSuperAdminRole(currentRole);

  useEffect(() => {
    if (isSuperAdminPath(pathname)) {
      dispatch(setActingOrganizationId(undefined));
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    const requests = [
      dispatch(fetchUsers(true)),
      dispatch(fetchCustomers(true, 1)),
    ];

    if (isSuperAdminRole(currentRole)) {
      requests.push(dispatch(fetchLogs(true)));
    }

    void Promise.all(requests);
  }, [actingOrganizationId, currentRole, dispatch]);

  function handleLogout() {
    dispatch(clearToken());

    startTransition(() => {
      router.replace(R.auth.prefix);
    });
  }

  function handleReturnToSuperAdmin() {
    startTransition(() => {
      router.push(R.protected.superAdmin.prefix);
    });
  }

  return {
    activeLabel: activeItem.label,
    canReturnToSuperAdmin,
    handleLogout,
    handleReturnToSuperAdmin,
    isPending,
    pathname,
    sidebarNavItems,
  };
}
