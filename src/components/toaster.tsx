"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import type { ToastProviderProps } from "@/models/toastProviderProps.model";
import { subscribeToToastNotifications } from "@/utility/toast";

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
