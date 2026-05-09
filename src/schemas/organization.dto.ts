import * as yup from "yup";
import { UserRole } from "@/enums/userRole.enum";

export const organizationSchema = yup.object().shape({
  organizationName: yup.string().trim().required(),
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().trim().required(),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(UserRole))
    .required()
    .default(UserRole.Admin),
});

export type OrganizationFormType = yup.InferType<typeof organizationSchema>;
