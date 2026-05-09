"use client";

import Link from "next/link";
import OrganizationForwardAction from "@/components/organizationForwardAction";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import useOrganizations from "@/hooks/useOrganizations";
import { cn } from "@/lib/cn";

export default function SuperAdminOrganizationsPage() {
  const { organizations } = useOrganizations();

  return (
    <section className="space-y-6">
      <div className="flex justify-end">
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
        emptyMessage="No organizations available yet."
        rows={organizations}
        title="Organizations"
      />
    </section>
  );
}
