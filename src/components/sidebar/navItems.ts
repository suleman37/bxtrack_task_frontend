import {
  Building2,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  Users,
  UsersRound,
} from "lucide-react";
import { R } from "@/constants/R";
import { isSuperAdminPath } from "@/lib/auth";

export type SidebarNavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export const defaultSidebarNavItems: SidebarNavItem[] = [
  {
    href: R.protected.admin.prefix,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: R.protected.admin.user,
    label: "Users",
    icon: Users,
  },
  {
    href: R.protected.admin.customers,
    label: "Customers",
    icon: UsersRound,
  },
];

export const superAdminSidebarNavItems: SidebarNavItem[] = [
  {
    href: R.protected.superAdmin.prefix,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: R.protected.superAdmin.organizations,
    label: "Organizations",
    icon: Building2,
  },
  {
    href: R.protected.superAdmin.logs,
    label: "Logs",
    icon: FileText,
  },
];

export function getSidebarNavItems(pathname: string) {
  if (isSuperAdminPath(pathname)) {
    return superAdminSidebarNavItems;
  }

  return defaultSidebarNavItems;
}
