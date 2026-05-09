"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userSchema, type UserFormType } from "@/schemas/user.dto";

export default function useUserForm() {
  return useForm<UserFormType>({
    resolver: yupResolver(userSchema),
  });
}
