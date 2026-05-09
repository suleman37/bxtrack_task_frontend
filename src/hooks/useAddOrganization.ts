"use client";

import { useRouter } from "next/navigation";
import { R } from "@/constants/R";
import type { OrganizationFormType } from "@/schemas/organization.dto";
import { useCreateUserMutation } from "@/services/user.service";

export default function useAddOrganization() {
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();

  async function handleSubmit(values: OrganizationFormType) {
    await createUser(values).unwrap();
    router.push(R.protected.superAdmin.organizations);
  }

  return {
    handleSubmit,
    isSubmitting: isLoading,
  };
}
