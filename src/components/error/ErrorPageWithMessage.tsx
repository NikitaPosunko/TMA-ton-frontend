import { useState } from "react";
import { useErrorContext } from "../../contexts/useContext";
import { GoToBasePageAndClearErrorContext } from "../Links";

export const ErrorPageWithMessage = () => {
  const errorContext = useErrorContext();
  const [errorMessage] = useState<string | null>(errorContext.errorMessage);

  return (
    <>
      <h3>{errorMessage}</h3>
      <GoToBasePageAndClearErrorContext />
    </>
  );
};
