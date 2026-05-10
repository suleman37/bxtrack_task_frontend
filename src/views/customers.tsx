"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  selectCustomers,
  selectCustomersPagination,
} from "@/app/slices/customer.slice";
import type { AppDispatch } from "@/app/store";
import Button from "@/components/button";
import CustomerTableActions from "@/components/customerTableActions";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";

export default function CustomersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(selectCustomers);
  const pagination = useSelector(selectCustomersPagination);

  function handlePageChange(page: number) {
    if (page === pagination.page || page < 1 || page > pagination.totalPages) {
      return;
    }

    dispatch(fetchCustomers(true, page));
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-end">
        <Link
          href={R.protected.admin.customersAdd}
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
            header: "Index",
            render: (_, rowIndex) => rowIndex + 1,
          },
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
            header: "Assigned To",
            render: (customer) => customer.assignedToName,
          },
          {
            header: "Actions",
            render: (customer) => (
              <CustomerTableActions
                customerId={customer.id}
                customerName={customer.name}
                customerStatus={customer.status}
              />
            ),
          },
        ]}
        description="Manage customers from the current protected page."
        rows={customers}
        emptyMessage="No customers available."
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              Page {pagination.page} of {pagination.totalPages} - {pagination.total}{" "}
              customer{pagination.total === 1 ? "" : "s"}
            </p>

            <div className="flex items-center gap-2">
              <Button
                className="h-10 rounded-lg bg-zinc-700 px-4 text-white hover:bg-zinc-800"
                disabled={!pagination.hasPreviousPage}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </Button>
              <Button
                className="h-10 rounded-lg px-4"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        }
        title="Customer Accounts"
      />
    </section>
  );
}
