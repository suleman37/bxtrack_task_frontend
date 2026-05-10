import type { UserModel } from "@/models/user.model";
import type { PaginationModel } from "@/models/pagination.model";

export type UserState = {
  users: UserModel[];
  pagination: PaginationModel;
};
