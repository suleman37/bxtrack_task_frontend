import type { CustomerModel } from "@/models/customer.model";
import type { PaginationModel } from "@/models/pagination.model";

export type CustomerState = {
  customers: CustomerModel[];
  pagination: PaginationModel;
};
