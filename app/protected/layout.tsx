import type { ProtectedLayoutProps } from "@/models/protectedLayoutProps.model";
import ProtectedShell from "@/src/components/sideBar";

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return <ProtectedShell>{children}</ProtectedShell>;
}
