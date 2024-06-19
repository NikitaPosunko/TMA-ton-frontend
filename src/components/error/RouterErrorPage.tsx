import { useRouteError } from "react-router-dom";
import { isReactRouterError } from "../../types/reactRouter/reactRouterTypes";
import { LinkToLoginPage } from "../Links";

export default function RouterErrorPage() {
  const error = useRouteError();

  let statusText: string | undefined;
  let message: string | undefined;
  const unknownError = "Unknown error";
  if (isReactRouterError(error)) {
    statusText = error?.statusText;
    message = error?.message;
  }

  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{statusText || message || unknownError}</i>
      </p>
      <LinkToLoginPage />
    </div>
  );
}
