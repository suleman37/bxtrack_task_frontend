import type { PaginationModel } from "@/models/pagination.model";

export type UserModel = {
  createdById?: number;
  email: string;
  id: number;
  name: string;
  organizationId?: number;
  organizationName?: string;
  role: string;
};

export type UserListModel = {
  users: UserModel[];
  pagination: PaginationModel;
};
