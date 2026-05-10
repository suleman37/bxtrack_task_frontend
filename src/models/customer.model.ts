import type { PaginationModel } from "@/models/pagination.model";

export type CustomerModel = {
  id: number;
  name: string;
  email: string;
  phone: string;
  assignedToName: string;
  status?: string;
};

export type CustomerListModel = {
  customers: CustomerModel[];
  pagination: PaginationModel;
};
