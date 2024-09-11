import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authCheck } from "../api/bind_api";

const PrivateRoute: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const rsp = await authCheck();
        if (rsp.status === 401) {
          navigate('/');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    // You can show a loading spinner or some placeholder here while checking
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default PrivateRoute;
