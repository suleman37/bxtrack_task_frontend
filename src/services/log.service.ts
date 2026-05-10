import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/constants/endpoints";
import type { LogListModel, LogModel } from "@/models/log.model";
import { baseQuery } from "@/utility/baseQuery";
import {
  DEFAULT_PAGE_LIMIT,
  resolvePagination,
} from "@/utility/pagination";

type LogQueryParams = {
  page?: number;
  limit?: number;
};

type RawLog = {
  id: string | number;
  action: string;
  details: string;
  createdById: number;
  createdByName: string;
  organizationId: number;
  organizationName: string;
  userId: number;
  userName: string;
  createdAt: string;
  updatedAt: string;
};

type RawLogsResponse =
  | RawLog[]
  | {
      data?: unknown;
      logs?: unknown;
      items?: unknown;
      rows?: unknown;
      results?: unknown;
    };

function resolveLogs(payload: RawLogsResponse): RawLog[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.logs)) {
    return payload.logs;
  }

  if (Array.isArray(payload.items)) {
    return payload.items as RawLog[];
  }

  if (Array.isArray(payload.rows)) {
    return payload.rows as RawLog[];
  }

  if (Array.isArray(payload.results)) {
    return payload.results as RawLog[];
  }

  if (typeof payload.data === "object" && payload.data !== null) {
    return resolveLogs(payload.data as RawLogsResponse);
  }

  return [];
}

function formatDateTime(timestamp: string) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return {
      date: "-",
      time: "-",
    };
  }

  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}

function mapLog(rawLog: RawLog, index: number): LogModel {
  const { date, time } = formatDateTime(rawLog.createdAt);

  return {
    id: rawLog.id ?? `log-${index}`,
    createdByName: rawLog.createdByName || rawLog.userName || "-",
    action: rawLog.action || "-",
    details: rawLog.details || "-",
    organizationName: rawLog.organizationName || "-",
    date,
    time,
  };
}

const logApi = createApi({
  reducerPath: "logApi",
  baseQuery,
  endpoints: (builder) => ({
    getLogs: builder.query<LogListModel, LogQueryParams | void>({
      query: (params) => ({
        url: endpoints.logs.getAll,
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? DEFAULT_PAGE_LIMIT,
        },
      }),
      transformResponse: (response: RawLogsResponse, _meta, arg) => {
        const page = arg?.page ?? 1;
        const limit = arg?.limit ?? DEFAULT_PAGE_LIMIT;
        const logs = resolveLogs(response).map(mapLog);

        return {
          logs,
          pagination: resolvePagination(response, logs.length, page, limit),
        };
      },
    }),
  }),
});

export const { useGetLogsQuery } = logApi;
export { logApi };
