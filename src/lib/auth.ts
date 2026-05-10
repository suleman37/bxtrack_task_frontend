import { R } from "@/constants/R";

export function normalizeUserRole(role: unknown) {
  return String(role);
}

export function isSuperAdminRole(role: unknown) {
  return normalizeUserRole(role) === "super_admin";
}

export function isUserRole(role: unknown) {
  return normalizeUserRole(role) === "user";
}

export function isSuperAdminPath(pathname: string) {
  return pathname.startsWith("/protected/super_admin");
}

export function getDashboardRouteByRole(role: unknown) {
  if (isSuperAdminRole(role)) {
    return R.protected.superAdmin.prefix;
  }

  if (isUserRole(role)) {
    return R.protected.userPanel.prefix;
  }

  return R.protected.admin.prefix;
}
