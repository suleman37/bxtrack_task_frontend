"use client";

import { useRouter } from "next/navigation";
import { R } from "@/constants/R";
import type { UserFormType } from "@/schemas/user.dto";
import { useCreateUserMutation } from "@/services/user.service";

export default function useAddUser() {
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();

  async function handleSubmit(values: UserFormType) {
    await createUser(values).unwrap();
    router.push(R.protected.admin.user);
  }

  return {
    handleSubmit,
    isSubmitting: isLoading,
  };
}
