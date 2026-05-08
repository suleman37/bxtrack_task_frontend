"use client";

import Link from "next/link";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import type { UserModel } from "@/models/user.model";

const users: UserModel[] = [];

export default function UsersPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-end">
        <Link
          href={R.protected.userAdd}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          )}
        >
          Add User
        </Link>
      </div>

      <DataTable
        columns={[
          {
            header: "User",
            render: (user) => (
              <div>
                <p className="font-medium text-zinc-950">{user.name}</p>
                <p className="mt-1 text-xs text-zinc-500">{user.id}</p>
              </div>
            ),
          },
          {
            header: "Email",
            render: (user) => user.email,
          },
          {
            header: "Role",
            render: (user) => (
              <span className="capitalize">{user.role}</span>
            ),
          },
          {
            header: "Status",
            render: (user) => (
              <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                {user.status}
              </span>
            ),
          },
          {
            header: "Last Login",
            render: (user) => user.lastLogin,
          },
        ]}
        description="Manage users from the current protected page."
        rows={users}
        emptyMessage="No users available."
        title="User Directory"
      />
    </section>
  );
}
