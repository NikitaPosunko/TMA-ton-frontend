import { useEffect, useState } from "react";
import { backendAxios } from "../utils/axiosConfig";
import { useErrorContext } from "../contexts/useContext";
import { useNavigate } from "react-router-dom";
import { ERROR_ROUTE } from "../static/routes";
import { BACKEND_SUBSCRIPTION_PHOTOS_REQUEST } from "../static/url";
import { LinkToLoginPage } from "../components/Links";

export const Photos = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState<object | null>(null);
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      backendAxios
        .get(BACKEND_SUBSCRIPTION_PHOTOS_REQUEST)
        .then((response) => {
          setPhotos(response.data);
          setLoading(false);
        })
        .catch((error) => {
          errorContext.setError(
            "Error fetching user data: " + (error as Error).message
          );
          console.error("Error fetching user data:", error);
          setLoading(false);
          navigate(ERROR_ROUTE, { replace: true });
        });
    };

    fetchUserData();
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="column">
      <h1>Photos</h1>
      <LinkToLoginPage />
      <p>{JSON.stringify(photos, null, 2)}</p>
    </div>
  );
};
