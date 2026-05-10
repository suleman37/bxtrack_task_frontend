import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "@/constants/endpoints";
import type { LogModel } from "@/models/log.model";
import { baseQuery } from "@/utility/baseQuery";

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

type RawLogsResponse = RawLog[] | { data?: RawLog[]; logs?: RawLog[] };

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
    getLogs: builder.query<LogModel[], void>({
      query: () => endpoints.logs.getAll,
      transformResponse: (response: RawLogsResponse) =>
        resolveLogs(response).map(mapLog),
    }),
  }),
});

export const { useGetLogsQuery } = logApi;
export { logApi };
