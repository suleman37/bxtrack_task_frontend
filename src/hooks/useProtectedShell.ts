"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "@/app/slices/auth.slice";
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
  const [isPending, startTransition] = useTransition();
  const sidebarNavItems = getSidebarNavItems(pathname);
  const activeItem =
    sidebarNavItems.find((item) => isActivePath(pathname, item.href)) ??
    sidebarNavItems[0];
  const currentRole = normalizeUserRole(getAuthRoleCookie());
  const canReturnToSuperAdmin =
    !isSuperAdminPath(pathname) && isSuperAdminRole(currentRole);

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
