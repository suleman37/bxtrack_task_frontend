"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUsers } from "@/app/slices/user.slice";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";

export default function UsersPage() {
  const users = useSelector(selectUsers);

  return (
    <section className="space-y-6">
      <div className="flex justify-end">
        <Link
          href={R.protected.admin.userAdd}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-[8px] bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          )}
        >
          Add User
        </Link>
      </div>

      <DataTable
        columns={[
          {
            header: "Index",
            render: (_, rowIndex) => rowIndex + 1,
          },
          {
            header: "User",
            render: (user) => user.name,
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
        ]}
        description="Manage users from the current protected page."
        rows={users}
        emptyMessage="No users available."
        title="User Directory"
      />
    </section>
  );
}
