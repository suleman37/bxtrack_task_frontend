"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import LoginForm from "@/components/login_from/login";
import { R } from "@/constants/R";
import type { LoginFormType } from "@/schemas/login.dto";

const LoginPage = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(values: LoginFormType) {
    console.log("Login values:", values);

    startTransition(() => {
      router.push(R.protected.prefix);
    });
  }

  return <LoginForm onSubmit={handleSubmit} isSubmitting={isPending} />;
};

export default LoginPage;
