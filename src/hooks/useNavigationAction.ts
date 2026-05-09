"use client";

import { useRouter } from "next/navigation";

export default function useNavigationAction(href: string) {
  const router = useRouter();

  function handleNavigate() {
    router.push(href);
  }

  return {
    handleNavigate,
  };
}
