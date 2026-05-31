import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return (
      <div
        data-testid="auth-checking"
        className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-300"
      >
        <Loader2 className="animate-spin mr-3 text-orange-500" />
        <span className="font-display uppercase tracking-wider">
          Verifying credentials
        </span>
      </div>
    );
  }

  if (user === false) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
