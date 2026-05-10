import type { SidebarNavItem } from "@/models/sidebarNavItem.model";

export type SidebarProps = {
  isPending?: boolean;
  items: SidebarNavItem[];
  onLogout: () => void;
  pathname: string;
};
