"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsers } from "@/app/slices/user.slice";
import type { AppDispatch } from "@/app/store";
import DeleteUserAction from "@/components/deleteUserAction";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import UpdateUserAction from "@/components/updateUserAction";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);

  useEffect(() => {
     dispatch(fetchUsers());
  }, [dispatch]);

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
          {
            header: "Actions",
            render: (user) => (
              <div className="flex items-center gap-2">
                <UpdateUserAction user={user} />
                <DeleteUserAction user={user} />
              </div>
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
