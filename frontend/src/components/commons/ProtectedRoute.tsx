import api from "@/api/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/users/getuser");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/auth", { replace: true }); // Use replace to avoid back navigation
        toast.error("You are not logged in");
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // While checking auth, optionally show a loading spinner or blank
    return (
      <>
        <div className="h-screen w-screen bg-black/50 flex justify-center items-center">
            <div>Loading...</div>
        </div>
      </>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, don't render children (already redirected)
  return null;
};

export default ProtectedRoute;