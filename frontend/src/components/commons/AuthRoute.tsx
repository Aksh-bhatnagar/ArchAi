import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

type Props = {
  children: React.ReactNode;
};

const AuthRoute: React.FC<Props> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user.user);

  // If already logged in → redirect away from auth page
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;