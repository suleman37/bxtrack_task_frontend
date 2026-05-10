import type { PaginationModel } from "@/models/pagination.model";
import type {
  PaginationRecordModel,
  PaginationResponseModel,
} from "@/models/paginationResponse.model";

export const DEFAULT_PAGE_LIMIT = 10;

export function toPositiveNumber(
  value: number | undefined,
  fallback: number
): number {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }

  return fallback;
}

export function shouldSkipPageChange(
  page: number,
  pagination: PaginationModel
) {
  return (
    page === pagination.page || page < 1 || page > pagination.totalPages
  );
}

function toBoolean(value: boolean | undefined, fallback: boolean): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  return fallback;
}

function getPaginationRecord(payload: unknown): PaginationRecordModel | null {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return null;
  }

  const record = payload as PaginationResponseModel;

  if (typeof record.pagination === "object" && record.pagination !== null) {
    return record.pagination;
  }

  if (typeof record.meta === "object" && record.meta !== null) {
    return record.meta;
  }

  if (
    typeof record.data === "object" &&
    record.data !== null &&
    !Array.isArray(record.data)
  ) {
    return record.data as PaginationResponseModel;
  }

  return record;
}

export function resolvePagination(
  payload: unknown,
  itemCount: number,
  requestedPage: number,
  requestedLimit: number
): PaginationModel {
  const source = getPaginationRecord(payload);

  if (!source) {
    return {
      page: requestedPage,
      limit: requestedLimit,
      total: itemCount,
      totalPages: Math.max(1, Math.ceil(itemCount / requestedLimit)),
      hasNextPage: false,
      hasPreviousPage: requestedPage > 1,
    };
  }

  const page = toPositiveNumber(
    source.page ?? source.currentPage,
    requestedPage
  );
  const limit = toPositiveNumber(
    source.limit ?? source.perPage,
    requestedLimit
  );
  const total = toPositiveNumber(
    source.total ?? source.totalItems ?? source.totalCount,
    itemCount
  );
  const totalPages = toPositiveNumber(
    source.totalPages ?? source.lastPage,
    Math.max(1, Math.ceil(total / limit))
  );

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: toBoolean(
      source.hasNextPage ?? source.hasNext,
      page < totalPages
    ),
    hasPreviousPage: toBoolean(
      source.hasPreviousPage ?? source.hasPrevPage ?? source.hasPrev,
      page > 1
    ),
  };
}
