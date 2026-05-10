export type PaginationRecordModel = {
  page?: number;
  currentPage?: number;
  limit?: number;
  perPage?: number;
  total?: number;
  totalItems?: number;
  totalCount?: number;
  totalPages?: number;
  lastPage?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  hasPrevPage?: boolean;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export type PaginationResponseModel = PaginationRecordModel & {
  pagination?: PaginationRecordModel;
  meta?: PaginationRecordModel;
  data?: unknown;
};
