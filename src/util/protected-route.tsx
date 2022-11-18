import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { ChildrenProps } from "./props";

export const ProtectedRoute = ({ children }: ChildrenProps): any => {
  const [cookies] = useCookies(["auth"]);

  const jwt = cookies.auth;

  if (jwt == null || jwt === "none") {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export const UnprotectedRoute = ({ children }: ChildrenProps): any => {
  const [cookies] = useCookies(["auth"]);

  const jwt = cookies.auth;

  if (jwt != null && jwt !== "none") {
    return <Navigate to="/home" replace />;
  }

  return children;
};
