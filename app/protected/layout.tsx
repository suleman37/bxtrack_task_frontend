import type { ReactNode } from "react";
import ProtectedShell from "@/src/components/sideBar";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  return <ProtectedShell>{children}</ProtectedShell>;
}
