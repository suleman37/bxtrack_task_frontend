"use client";

import {
  LayoutDashboard,
  Users,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";

type ProtectedShellProps = {
  children: ReactNode;
};

const navItems = [
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

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function ProtectedShell({ children }: ProtectedShellProps) {
  const pathname = usePathname();
  const activeItem =
    navItems.find((item) => isActivePath(pathname, item.href)) ?? navItems[0];

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="border-b border-zinc-200 bg-zinc-950 text-zinc-100 md:min-h-screen md:w-72 md:border-b-0 md:border-r md:border-zinc-800">
          <div className="flex h-full flex-col">
            <div className="border-b border-zinc-800 px-6 py-4.5">
              <h1 className="text-xl font-semibold tracking-tight text-white">
                Admin Panel
              </h1>
            </div>

            <nav className="flex-1 px-4 py-5">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-[8px] border px-4 py-3 text-sm font-medium transition-colors",
                          active
                            ? "border-zinc-700 bg-white/10 text-white"
                            : "border-transparent text-zinc-300 hover:border-zinc-800 hover:bg-zinc-900 hover:text-white"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

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
