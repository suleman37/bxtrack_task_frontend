"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/app/slices/auth.slice";
import type { AppDispatch } from "@/app/store";
import LoginForm from "@/src/components/loginFrom/login";
import { getDashboardRouteByRole, normalizeUserRole } from "@/lib/auth";
import type { LoginFormType } from "@/schemas/login.dto";
import { removeAuthRoleCookie, setAuthRoleCookie } from "@/services/cookie.service";
import { useLoginMutation } from "@/services/auth.service";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();

  async function handleSubmit(values: LoginFormType) {
    const response = await login(values).unwrap();

    if (response.Token) {
      dispatch(setToken(response.Token));
    }

    const role = normalizeUserRole(response.role);
    if (role) {
      setAuthRoleCookie(role);
    } else {
      removeAuthRoleCookie();
    }

    router.push(getDashboardRouteByRole(role));
  }

  return <LoginForm onSubmit={handleSubmit} isSubmitting={isLoading} />;
};

export default LoginPage;
