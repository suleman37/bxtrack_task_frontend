"use client";

import { Trash2 } from "lucide-react";
import type { UserModel } from "@/models/user.model";

type DeleteUserActionProps = {
  user: UserModel;
};

export default function DeleteUserAction({
  user,
}: DeleteUserActionProps) {
  return (
    <button
      type="button"
      aria-label="Delete user"
      onClick={() => console.log("Delete user:", user)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
