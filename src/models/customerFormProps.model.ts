import type { UserModel } from "@/models/user.model";
import type { CustomerFormType } from "@/schemas/customer.dto";

export type CustomerFormProps = {
  assignableUsers: UserModel[];
  cancelHref: string;
  isSubmitting?: boolean;
  onSubmit: (values: CustomerFormType) => void | Promise<void>;
};
