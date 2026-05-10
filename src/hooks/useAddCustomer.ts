"use client";

import { useRouter } from "next/navigation";
import { R } from "@/constants/R";
import type { CustomerFormType } from "@/schemas/customer.dto";
import { useCreateCustomerMutation } from "@/services/customer.service";

export default function useAddCustomer() {
  const router = useRouter();
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();

  async function handleSubmit(values: CustomerFormType) {
    await createCustomer(values).unwrap();
    router.push(R.protected.admin.customers);
  }

  return {
    handleSubmit,
    isSubmitting: isLoading,
  };
}
