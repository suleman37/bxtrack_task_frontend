"use client";

import Link from "next/link";
import DataTable from "@/components/data-table";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import type { CustomerModel } from "@/models/customer.model";

const customers: CustomerModel[] = [];

export default function CustomersPage() {
  return (
    <section className="space-y-6">
      <div className="flex justify-end">
        <Link
          href={R.protected.customersAdd}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          )}
        >
          Add Customer
        </Link>
      </div>

      <DataTable
        columns={[
          {
            header: "Name",
            render: (customer) => customer.name,
          },
          {
            header: "Email",
            render: (customer) => customer.email,
          },
          {
            header: "Phone",
            render: (customer) => customer.phone,
          },
          {
            header: "Organization ID",
            render: (customer) => customer.organizationId,
          },
          {
            header: "Assigned To",
            render: (customer) => customer.assignedTo,
          },
        ]}
        description="Manage customers from the current protected page."
        rows={customers}
        emptyMessage="No customers available."
        title="Customer Accounts"
      />
    </section>
  );
}
