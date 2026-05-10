import type { UserFormType } from "@/schemas/user.dto";

export type UserFormProps = {
  cancelHref: string;
  isSubmitting?: boolean;
  onSubmit: (values: UserFormType) => void | Promise<void>;
};
