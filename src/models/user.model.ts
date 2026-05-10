import type { PaginationModel } from "@/models/pagination.model";

export type UserModel = {
  createdById: number | null;
  email: string;
  id: number;
  name: string;
  organizationId: number | null;
  organizationName: string | null;
  role: string;
};

export type UserListModel = {
  users: UserModel[];
  pagination: PaginationModel;
};
