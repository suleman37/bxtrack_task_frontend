"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserRole } from "@/enums/userRole.enum";
import { userSchema, type UserFormType } from "@/schemas/user.dto";

export default function useUserForm() {
  return useForm<UserFormType>({
    defaultValues: {
      role: UserRole.User,
    },
    resolver: yupResolver(userSchema),
  });
}
