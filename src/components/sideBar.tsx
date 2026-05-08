"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useTransition } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "@/app/slices/auth.slice";
import type { AppDispatch } from "@/app/store";
import { R } from "@/constants/R";
import Sidebar from "@/src/components/sidebar/sidebar";
import { sidebarNavItems } from "@/src/components/sidebar/navItems";

type ProtectedShellProps = {
  children: ReactNode;
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ProtectedShell({ children }: ProtectedShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isPending, startTransition] = useTransition();
  const activeItem =
    sidebarNavItems.find((item) => isActivePath(pathname, item.href)) ??
    sidebarNavItems[0];

  function handleLogout() {
    dispatch(clearToken());

    startTransition(() => {
      router.replace(R.auth.prefix);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar
          pathname={pathname}
          onLogout={handleLogout}
          isPending={isPending}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="border-b border-zinc-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              {activeItem.label}
            </h2>
          </header>

          <main className="flex-1 px-5 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
