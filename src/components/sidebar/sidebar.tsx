"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SidebarNavItem } from "@/src/components/sidebar/navItems";

type SidebarProps = {
  isPending?: boolean;
  items: SidebarNavItem[];
  onLogout: () => void;
  pathname: string;
};

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Sidebar({
  isPending,
  items,
  onLogout,
  pathname,
}: SidebarProps) {
  return (
    <aside className="border-b border-zinc-200 bg-zinc-950 text-zinc-100 md:min-h-screen md:w-72 md:border-b-0 md:border-r md:border-zinc-800">
      <div className="flex h-full flex-col">
        <div className="border-b border-zinc-800 px-6 py-4.5">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Admin Panel
          </h1>
        </div>

        <nav className="flex-1 px-4 py-5">
          <ul className="space-y-2">
            {items.map((item) => {
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

        <div>
          <button
            type="button"
            onClick={onLogout}
            disabled={isPending}
            className="flex w-full items-center gap-3 border border-zinc-800 px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white disabled:pointer-events-none disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
