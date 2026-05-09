"use client";

import Link from "next/link";
import OrganizationForm from "@/components/organizationForm/form";
import { R } from "@/constants/R";
import useAddOrganization from "@/hooks/useAddOrganization";

export default function AddOrganizationPage() {
  const { handleSubmit, isSubmitting } = useAddOrganization();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
            Add Organization
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Create an organization with organization name plus the same user-style inputs.
          </p>
        </div>

        <Link
          href={R.protected.superAdmin.organizations}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          Back to organizations
        </Link>
      </div>

      <OrganizationForm
        cancelHref={R.protected.superAdmin.organizations}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
