"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/app/slices/auth.slice";
import type { AppDispatch } from "@/app/store";
import LoginForm from "@/components/login_from/login";
import { R } from "@/constants/R";
import type { LoginFormType } from "@/schemas/login.dto";
import { useLoginMutation } from "@/services/auth.service";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isPending, startTransition] = useTransition();
  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(values: LoginFormType) {
    const response = await login(values).unwrap();
    
    if (response.Token) {
      dispatch(setToken(response.Token));
    }

    startTransition(() => {
      router.push(R.protected.prefix);
    });
  }

  return <LoginForm onSubmit={handleSubmit} isSubmitting={isPending || isLoading} />;
};

export default LoginPage;
