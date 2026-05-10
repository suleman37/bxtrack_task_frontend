"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectUsers,
  selectUsersPagination,
} from "@/app/slices/user.slice";
import type { AppDispatch } from "@/app/store";
import TableSearchInput from "@/components/tableSearchInput";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import { shouldSkipPageChange } from "@/utility/pagination";

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const pagination = useSelector(selectUsersPagination);
  const [searchValue, setSearchValue] = useState("");
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!normalizedSearchValue) {
      return true;
    }

    return [user.name, user.email, user.role, user.organizationName ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearchValue);
  });

  function handlePageChange(page: number) {
    if (shouldSkipPageChange(page, pagination)) {
      return;
    }

    dispatch(fetchUsers(true, page));
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TableSearchInput
          onChange={setSearchValue}
          placeholder="Search users"
          value={searchValue}
        />

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
            render: (_, rowIndex) =>
              (pagination.page - 1) * pagination.limit + rowIndex + 1,
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
        rows={filteredUsers}
        emptyMessage={
          normalizedSearchValue
            ? "No users match your search."
            : "No users available."
        }
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              Page {pagination.page} of {pagination.totalPages} - {pagination.total}{" "}
              user{pagination.total === 1 ? "" : "s"}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
                disabled={!pagination.hasPreviousPage}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        }
        title="User Directory"
      />
    </section>
  );
}
