"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserRole } from "@/enums/userRole.enum";
import { organizationSchema, type OrganizationFormType } from "@/schemas/organization.dto";

export default function useOrganizationForm() {
  return useForm<OrganizationFormType>({
    resolver: yupResolver(organizationSchema),
    defaultValues: {
      role: UserRole.Admin,
    },
  });
}
