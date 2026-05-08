"use client";

import { Pencil } from "lucide-react";
import type { UserModel } from "@/models/user.model";

type UpdateUserActionProps = {
  user: UserModel;
};

export default function UpdateUserAction({
  user,
}: UpdateUserActionProps) {
  return (
    <button
      type="button"
      aria-label="Update user"
      onClick={() => console.log("Update user:", user)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
    >
      <Pencil className="h-4 w-4" />
    </button>
  );
}
