import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

// ProtectedVerifyRoute.tsx
export const ProtectedVerifyRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth = useAuth();

  if (!auth.isRegistering) {
    return <Navigate to="/signup" replace />;
  }

  return <>{children}</>;
};
