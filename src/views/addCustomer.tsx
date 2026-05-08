"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomerForm from "@/components/customerForm/form";
import { R } from "@/constants/R";

export default function AddCustomerPage() {
  const router = useRouter();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
            Add Customer
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Create a customer with name, email, phone, organization ID, and assigned user.
          </p>
        </div>

        <Link
          href={R.protected.customers}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          Back to customers
        </Link>
      </div>

      <CustomerForm
        cancelHref={R.protected.customers}
        onSubmit={async () => {
          router.push(R.protected.customers);
        }}
      />
    </section>
  );
}
