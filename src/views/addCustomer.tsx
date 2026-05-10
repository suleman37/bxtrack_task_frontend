"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "@/app/slices/customer.slice";
import { selectUsers } from "@/app/slices/user.slice";
import type { AppDispatch } from "@/app/store";
import CustomerForm from "@/components/customerForm/form";
import { R } from "@/constants/R";
import { UserRole } from "@/enums/userRole.enum";
import type { CustomerFormType } from "@/schemas/customer.dto";
import { useCreateCustomerMutation } from "@/services/customer.service";

export default function AddCustomerPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const assignableUsers = users.filter((user) => user.role === UserRole.User);

  async function handleSubmit(values: CustomerFormType) {
    await createCustomer(values).unwrap();
    await dispatch(fetchCustomers(true));
    router.push(R.protected.admin.customers);
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
            Add Customer
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Create a customer with name, email, phone, and assigned user.
          </p>
        </div>

        <Link
          href={R.protected.admin.customers}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          Back to customers
        </Link>
      </div>

      <CustomerForm
        assignableUsers={assignableUsers}
        cancelHref={R.protected.admin.customers}
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
