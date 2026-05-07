"use client";

import LoginForm from "@/components/login_from/login";
import type { LoginFormType } from "@/schemas/login.dto";

const LoginPage = () => {
  async function handleSubmit(values: LoginFormType) {
    console.log("Login values:", values);
  }

  return <LoginForm onSubmit={handleSubmit} />;
};

export default LoginPage;
