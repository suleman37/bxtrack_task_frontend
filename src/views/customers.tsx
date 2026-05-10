"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectActingOrganizationId } from "@/app/slices/auth.slice";
import { fetchCustomers, selectCustomers } from "@/app/slices/customer.slice";
import type { AppDispatch } from "@/app/store";
import DeleteAction from "@/components/deleteAction";
import NoteAction from "@/components/noteAction";
import DataTable from "@/src/components/dataTable";
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import { useDeleteCustomerMutation } from "@/services/customer.service";

export default function CustomersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(selectCustomers);
  const actingOrganizationId = useSelector(selectActingOrganizationId);
  const [deleteCustomer, { isLoading: isDeletingCustomer }] =
    useDeleteCustomerMutation();

  useEffect(() => {
    dispatch(fetchCustomers(true));
  }, [dispatch, actingOrganizationId]);

  async function handleDeleteCustomer(customerId: number) {
    await deleteCustomer(customerId).unwrap();
    dispatch(fetchCustomers(true));
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
              <div className="flex items-center gap-2">
                <NoteAction
                  ariaLabel="Customer notes"
                  onClick={() => console.log("Customer notes:", customer)}
                />
                <DeleteAction
                  ariaLabel="Delete customer"
                  disabled={isDeletingCustomer}
                  onClick={() => handleDeleteCustomer(customer.id)}
                />
              </div>
            ),
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
