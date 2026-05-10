"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  selectCustomers,
  selectCustomersPagination,
} from "@/app/slices/customer.slice";
import type { AppDispatch } from "@/app/store";
import CustomerTableActions from "@/components/customerTableActions";
import TableSearchInput from "@/components/tableSearchInput";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import { shouldSkipPageChange } from "@/utility/pagination";

export default function CustomersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(selectCustomers);
  const pagination = useSelector(selectCustomersPagination);
  const [searchValue, setSearchValue] = useState("");
  const normalizedSearchValue = searchValue.trim().toLowerCase();
  const filteredCustomers = customers.filter((customer) => {
    if (!normalizedSearchValue) {
      return true;
    }

    return [
      customer.name,
      customer.email,
      customer.phone,
      customer.assignedToName,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearchValue);
  });

  function handlePageChange(page: number) {
    if (shouldSkipPageChange(page, pagination)) {
      return;
    }

    dispatch(fetchCustomers(true, page));
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TableSearchInput
          onChange={setSearchValue}
          placeholder="Search customers"
          value={searchValue}
        />

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
            render: (_, rowIndex) =>
              (pagination.page - 1) * pagination.limit + rowIndex + 1,
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
        rows={filteredCustomers}
        emptyMessage={
          normalizedSearchValue
            ? "No customers match your search."
            : "No customers available."
        }
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              Page {pagination.page} of {pagination.totalPages} - {pagination.total}{" "}
              customer{pagination.total === 1 ? "" : "s"}
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
        title="Customer Accounts"
      />
    </section>
  );
}
