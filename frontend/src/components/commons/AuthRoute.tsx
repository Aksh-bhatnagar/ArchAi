import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Loader from "./Loader";

type Props = {
  children: React.ReactNode;
};

const AuthRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useSelector((state: RootState) => state.user);

  if (loading) {
    return <Loader text="" />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;