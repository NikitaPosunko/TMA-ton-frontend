export interface ReactRouterError {
  statusText?: string;
  message?: string;
}

export function isReactRouterError(error: unknown): error is ReactRouterError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("statusText" in error || "message" in error)
  );
}
