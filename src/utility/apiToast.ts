import { showErrorToast, showSuccessToast } from "@/utility/toast";

function extractApiMessage(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  if ("message" in payload && typeof payload.message === "string") {
    const message = payload.message.trim();

    if (message) {
      return message;
    }
  }

  if ("data" in payload) {
    return extractApiMessage(payload.data);
  }

  return undefined;
}

function resolveRejectedPayload(error: unknown) {
  if (typeof error === "object" && error !== null && "error" in error) {
    return error.error;
  }

  return error;
}

export async function showToastForMutation(
  queryFulfilled: Promise<{ data: unknown }>
) {
  try {
    const { data } = await queryFulfilled;
    const message = extractApiMessage(data);

    if (message) {
      showSuccessToast(message);
    }
  } catch (error) {
    const message = extractApiMessage(resolveRejectedPayload(error));

    if (message) {
      showErrorToast(message);
    }
  }
}
