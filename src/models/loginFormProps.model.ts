import type { LoginFormType } from "@/schemas/login.dto";

export type LoginFormProps = {
  onSubmit: (values: LoginFormType) => void | Promise<void>;
  isSubmitting?: boolean;
};
