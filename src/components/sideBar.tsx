"use client";

import { ArrowLeftCircle } from "lucide-react";
import type { ReactNode } from "react";
import useProtectedShell from "@/hooks/useProtectedShell";
import Sidebar from "@/src/components/sidebar/sidebar";

type ProtectedShellProps = {
  children: ReactNode;
};

export default function ProtectedShell({ children }: ProtectedShellProps) {
  const {
    activeLabel,
    canReturnToSuperAdmin,
    handleLogout,
    handleReturnToSuperAdmin,
    isPending,
    pathname,
    sidebarNavItems,
  } = useProtectedShell();

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar
          items={sidebarNavItems}
          pathname={pathname}
          onLogout={handleLogout}
          isPending={isPending}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              {activeLabel}
            </h2>
            {canReturnToSuperAdmin ? (
              <button
                type="button"
                onClick={handleReturnToSuperAdmin}
                className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
              >
                <ArrowLeftCircle className="h-5 w-5" />
                <span>Back to Super Admin Panel</span>
              </button>
            ) : null}
          </header>

          <main className="flex-1 px-5 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
