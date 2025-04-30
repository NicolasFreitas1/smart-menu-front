import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Header } from "@/components/header";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/axios";

export function AppLayout() {
  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (user && user.isAdmin) {
      navigate("/admin/users", { replace: true });
      return;
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            navigate("/sign-in", { replace: true });
          } else {
            throw error;
          }
        }
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate, isAuthenticated, user?.isAdmin]);

  return (
    <div className="flex h-full flex-col antialiased overflow-hidden">
      <Header />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <Outlet />
      </div>
    </div>
  );
}
