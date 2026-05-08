import * as yup from "yup";
import { UserRole } from "@/enums/userRole.enum";

export const userSchema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup.string().trim().required(),
  role: yup.mixed<UserRole>().oneOf(Object.values(UserRole)).required(),
});

export type UserFormType = yup.InferType<typeof userSchema>;
