"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import UserForm from "@/components/userForm/form";
import { R } from "@/constants/R";

export default function AddUserPage() {
  const router = useRouter();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
            Add User
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Create a user with name, email, and role.
          </p>
        </div>

        <Link
          href={R.protected.user}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          Back to users
        </Link>
      </div>

      <UserForm
        cancelHref={R.protected.user}
        onSubmit={async () => {
          router.push(R.protected.user);
        }}
      />
    </section>
  );
}
