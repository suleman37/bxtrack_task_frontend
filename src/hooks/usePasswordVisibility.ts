"use client";

import { useState } from "react";

export default function usePasswordVisibility(defaultVisible = false) {
  const [showPassword, setShowPassword] = useState(defaultVisible);

  function togglePasswordVisibility() {
    setShowPassword((value) => !value);
  }

  return {
    showPassword,
    togglePasswordVisibility,
  };
}
