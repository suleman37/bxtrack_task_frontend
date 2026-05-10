type ToastVariant = "success" | "error";

type ToastNotification = {
  variant: ToastVariant;
  message: string;
};

type ToastListener = (notification: ToastNotification) => void;

const toastListeners = new Set<ToastListener>();

export function subscribeToToastNotifications(listener: ToastListener) {
  toastListeners.add(listener);

  return () => {
    toastListeners.delete(listener);
  };
}

function emitToast(variant: ToastVariant, message: string) {
  const normalizedMessage = message.trim();

  if (!normalizedMessage) {
    return;
  }

  toastListeners.forEach((listener) =>
    listener({ variant, message: normalizedMessage })
  );
}

export function showSuccessToast(message: string) {
  emitToast("success", message);
}

export function showErrorToast(message: string) {
  emitToast("error", message);
}
