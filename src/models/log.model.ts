import type { PaginationModel } from "@/models/pagination.model";

export type LogModel = {
  id: string | number;
  createdByName: string;
  action: string;
  details: string;
  organizationName: string;
  date: string;
  time: string;
};

export type LogListModel = {
  logs: LogModel[];
  pagination: PaginationModel;
};
