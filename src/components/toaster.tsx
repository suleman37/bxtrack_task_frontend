"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { subscribeToToastNotifications } from "@/utility/toast";

type ToastProviderProps = {
  children: ReactNode;
};

export default function ToastProvider({ children }: ToastProviderProps) {
  useEffect(() => {
    return subscribeToToastNotifications(({ variant, message }) => {
      if (variant === "success") {
        toast.success(message);
        return;
      }

      toast.error(message);
    });
  }, []);

  return (
    <>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
