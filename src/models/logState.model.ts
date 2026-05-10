import type { LogModel } from "@/models/log.model";
import type { PaginationModel } from "@/models/pagination.model";

export type LogState = {
  logs: LogModel[];
  pagination: PaginationModel;
};
