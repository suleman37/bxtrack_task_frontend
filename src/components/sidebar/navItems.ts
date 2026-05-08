import {
  LayoutDashboard,
  type LucideIcon,
  Users,
  UsersRound,
} from "lucide-react";
import { R } from "@/constants/R";

export type SidebarNavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export const sidebarNavItems: SidebarNavItem[] = [
  {
    href: R.protected.prefix,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: R.protected.user,
    label: "Users",
    icon: Users,
  },
  {
    href: R.protected.customers,
    label: "Customers",
    icon: UsersRound,
  },
];
