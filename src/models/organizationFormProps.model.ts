import type { OrganizationFormType } from "@/schemas/organization.dto";

export type OrganizationFormProps = {
  cancelHref: string;
  isSubmitting?: boolean;
  onSubmit: (values: OrganizationFormType) => void | Promise<void>;
};
