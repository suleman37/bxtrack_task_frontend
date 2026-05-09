import { R } from "@/constants/R";

export function normalizeUserRole(role: unknown) {
  return String(role);
}

export function isSuperAdminRole(role: unknown) {
  return normalizeUserRole(role) === "super_admin";
}

export function isSuperAdminPath(pathname: string) {
  return pathname.startsWith("/protected/super_admin");
}

export function getDashboardRouteByRole(role: unknown) {
  return isSuperAdminRole(role)
    ? R.protected.superAdmin.prefix
    : R.protected.admin.prefix;
}
