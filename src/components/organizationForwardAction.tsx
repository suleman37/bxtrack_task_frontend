"use client";

import { ArrowRightCircle } from "lucide-react";
import useNavigationAction from "@/hooks/useNavigationAction";

type OrganizationForwardActionProps = {
  href: string;
};

export default function OrganizationForwardAction({
  href,
}: OrganizationForwardActionProps) {
  const { handleNavigate } = useNavigationAction(href);

  return (
    <button
      type="button"
      aria-label="Go to organization details"
      onClick={handleNavigate}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
    >
      <ArrowRightCircle className="h-6 w-6" />
    </button>
  );
}
