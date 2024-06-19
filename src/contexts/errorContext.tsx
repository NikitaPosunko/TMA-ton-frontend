import React, { useState } from "react";

// Define an ErrorContext to manage the error state
export const ErrorContext = React.createContext<{
  errorMessage: string | null;
  setError: (message: string | null) => void;
  //errorNavigate: () => void;
}>({
  errorMessage: null,
  setError: () => {},
  //errorNavigate: () => {},
});

// ErrorContext Provider
export const ErrorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setError = (message: string | null) => {
    setErrorMessage(message);
  };

  // const errorNavigate = () => {
  //   navigate(ERROR_ROUTE, { replace: true });
  // };

  const value = {
    errorMessage,
    setError,
    //errorNavigate,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
