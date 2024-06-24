import { useCallback, useEffect, useState } from "react";
import { backendAxios } from "../utils/axiosConfig";
import { BACKEND_SUBSCRIBER_PROTECTED_ROUTE_REQUEST } from "../static/url";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../contexts/useContext";
import { ERROR_ROUTE } from "../static/routes";
import { Loading } from "../components/Components";
import { LinkToLoginPage } from "../components/Links";

export const SubscriberProtectedPage = () => {
  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState<{ message: string } | null>(
    null
  );

  // error handling
  const navigate = useNavigate();
  const errorContext = useErrorContext();

  const handleError = useCallback(
    (error: { message: string }) => {
      errorContext.setError(error.message);
      console.log(errorContext.errorMessage);
      navigate(ERROR_ROUTE, { replace: true });
    },
    [errorContext, navigate]
  );

  useEffect(() => {
    const fetchSubscriptionPageContent = async () => {
      try {
        const request = await backendAxios.get(
          BACKEND_SUBSCRIBER_PROTECTED_ROUTE_REQUEST
        );
        setPageContent(request.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError({ message: "You're not a subscriber" });
      }
    };

    fetchSubscriptionPageContent();
  }, [handleError]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <p>{pageContent?.message}</p>
      <LinkToLoginPage />
    </div>
  );
};
