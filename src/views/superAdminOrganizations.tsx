"use client";

import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "@/app/slices/user.slice";
import OrganizationForwardAction from "@/components/organizationForwardAction";
import TableSearchInput from "@/components/tableSearchInput";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import type { UserModel } from "@/models/user.model";

export default function SuperAdminOrganizationsPage() {
  const organizations = useSelector(selectUsers).filter(
    (user: UserModel) => user.organizationName
  ) as UserModel[];
  const [searchValue, setSearchValue] = useState("");
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const filteredOrganizations = organizations.filter((organization) => {
    if (!normalizedSearchValue) {
      return true;
    }

    return [
      organization.organizationName ?? "",
      organization.name,
      organization.email,
      organization.role,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearchValue);
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TableSearchInput
          onChange={setSearchValue}
          placeholder="Search organizations"
          value={searchValue}
        />

        <Link
          href={R.protected.superAdmin.organizationsAdd}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-[8px] bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          )}
        >
          Add Organization
        </Link>
      </div>

      <DataTable
        columns={[
          {
            header: "Index",
            render: (_, rowIndex) => rowIndex + 1,
          },
          {
            header: "Organization",
            render: (organization) => organization.organizationName,
          },
          {
            header: "Name",
            render: (organization) => organization.name,
          },
          {
            header: "Email",
            render: (organization) => organization.email,
          },
          {
            header: "Role",
            render: (organization) => (
              <span className="capitalize">{organization.role}</span>
            ),
          },
          {
            header: "Actions",
            render: (organization) => (
              <OrganizationForwardAction
                href={R.protected.admin.dashboardById(organization.id)}
              />
            ),
          },
        ]}
        description="Monitor organizations from the super admin workspace."
        emptyMessage={
          normalizedSearchValue
            ? "No organizations match your search."
            : "No organizations available yet."
        }
        rows={filteredOrganizations}
        title="Organizations"
      />
    </section>
  );
}
