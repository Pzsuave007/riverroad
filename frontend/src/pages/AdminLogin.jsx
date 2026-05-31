import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

const LOGO_SRC = "/brand/river-road-logo.jpeg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { formatApiErrorDetail } from "@/lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user !== null && user !== false) {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(
        formatApiErrorDetail(err.response?.data?.detail) || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="admin-login-page"
      className="min-h-screen flex items-center justify-center bg-zinc-950 bg-grid px-4 py-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-zinc-950 to-zinc-950" />
      <div className="relative w-full max-w-md">
        <Link
          to="/"
          data-testid="admin-back-link"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-red-500 text-xs uppercase tracking-[0.25em] font-bold mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 p-8 lg:p-10">
          <img
            src={LOGO_SRC}
            alt="River Road Custom Metal Fabrication"
            className="h-16 w-auto object-contain mb-6"
          />
          <div className="text-[10px] tracking-[0.3em] text-red-500 font-bold uppercase mb-8">
            Admin Console
          </div>

          <h1 className="font-display uppercase tracking-tighter font-bold text-3xl text-white mb-2">
            Sign In
          </h1>
          <p className="text-sm text-zinc-400 mb-8">
            Restricted access — quote management dashboard.
          </p>

          <form onSubmit={onSubmit} className="space-y-5" data-testid="admin-login-form">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold">
                Email
              </Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="admin-login-email"
                placeholder="admin@riverroadmetal.com"
                className="bg-zinc-950 border-zinc-700 focus-visible:ring-red-500 focus-visible:border-red-500 text-white rounded-none h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-bold">
                Password
              </Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="admin-login-password"
                placeholder="••••••••"
                className="bg-zinc-950 border-zinc-700 focus-visible:ring-red-500 focus-visible:border-red-500 text-white rounded-none h-11"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              data-testid="admin-login-submit"
              className="w-full rounded-none h-12 bg-red-600 hover:bg-red-500 text-white uppercase font-bold tracking-widest"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
