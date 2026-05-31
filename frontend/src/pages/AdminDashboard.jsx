import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  LogOut,
  Loader2,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  Building2,
  Flame,
  ArrowLeft,
  Filter,
} from "lucide-react";

import api, { formatApiErrorDetail } from "@/lib/api";
import { STATUS_LABELS } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const STATUSES = ["new", "in_review", "contacted", "closed"];

const STATUS_STYLES = {
  new: "bg-orange-500/15 text-orange-400 border-orange-500/40",
  in_review: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
  contacted: "bg-sky-500/15 text-sky-400 border-sky-500/40",
  closed: "bg-zinc-700/40 text-zinc-300 border-zinc-600",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter === "all" ? {} : { status_filter: filter };
      const [qRes, sRes] = await Promise.all([
        api.get("/admin/quotes", { params }),
        api.get("/admin/quotes/stats"),
      ]);
      setQuotes(qRes.data);
      setStats(sRes.data);
    } catch (err) {
      toast.error(
        formatApiErrorDetail(err.response?.data?.detail) || "Failed to load"
      );
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const onLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const onStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.patch(`/admin/quotes/${id}`, {
        status: newStatus,
      });
      setQuotes((prev) => prev.map((q) => (q.id === id ? data : q)));
      if (selected?.id === id) setSelected(data);
      toast.success(`Marked ${STATUS_LABELS[newStatus]}`);
      // refresh stats
      const sRes = await api.get("/admin/quotes/stats");
      setStats(sRes.data);
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this quote permanently?")) return;
    setDeletingId(id);
    try {
      await api.delete(`/admin/quotes/${id}`);
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success("Quote deleted");
      const sRes = await api.get("/admin/quotes/stats");
      setStats(sRes.data);
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setDeletingId(null);
    }
  };

  const statCards = useMemo(
    () => [
      { key: "total", label: "Total Quotes", accent: "text-white" },
      { key: "new", label: "New", accent: "text-orange-500" },
      { key: "in_review", label: "In Review", accent: "text-yellow-400" },
      { key: "contacted", label: "Contacted", accent: "text-sky-400" },
      { key: "closed", label: "Closed", accent: "text-zinc-400" },
    ],
    []
  );

  return (
    <div
      data-testid="admin-dashboard"
      className="min-h-screen bg-zinc-950 text-white"
    >
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="h-9 w-9 grid place-items-center bg-orange-600 text-white">
              <Flame className="h-4 w-4" />
            </span>
            <div className="hidden sm:block">
              <div className="font-display uppercase tracking-tight font-bold text-base leading-tight">
                Admin Console
              </div>
              <div className="text-[10px] tracking-[0.3em] text-orange-500 font-bold uppercase">
                River Road Metal
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              data-testid="admin-back-to-site"
              className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-orange-500 font-bold"
            >
              <ArrowLeft className="h-4 w-4" /> View Site
            </Link>
            <span className="hidden md:inline text-xs text-zinc-500">
              {user?.email}
            </span>
            <Button
              onClick={onLogout}
              data-testid="admin-logout-btn"
              variant="outline"
              size="sm"
              className="rounded-none border-zinc-700 bg-transparent hover:bg-zinc-900 hover:text-orange-500 uppercase tracking-wider text-xs font-bold"
            >
              <LogOut className="h-4 w-4 mr-1.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-10 py-10 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="h-px w-10 bg-orange-500" />
              <span className="text-xs uppercase tracking-[0.35em] text-orange-500 font-bold">
                Dashboard
              </span>
            </div>
            <h1 className="font-display uppercase tracking-tighter font-bold text-3xl lg:text-4xl">
              Quote Requests
            </h1>
          </div>
          <Button
            onClick={load}
            data-testid="admin-refresh-btn"
            variant="outline"
            className="rounded-none border-zinc-700 bg-transparent hover:bg-zinc-900 hover:text-orange-500 uppercase tracking-wider text-xs font-bold"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>

        {/* Stats */}
        <div
          data-testid="admin-stats"
          className="grid grid-cols-2 md:grid-cols-5 gap-px bg-zinc-800 border border-zinc-800"
        >
          {statCards.map((c) => (
            <div key={c.key} className="bg-zinc-950 p-5">
              <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold mb-2">
                {c.label}
              </div>
              <div
                className={`font-display text-3xl font-bold tracking-tight ${c.accent}`}
                data-testid={`stat-${c.key}`}
              >
                {stats ? stats[c.key] ?? 0 : "—"}
              </div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-zinc-500" />
          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">
            Filter
          </span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger
              data-testid="admin-filter-select"
              className="w-[200px] bg-zinc-950 border-zinc-700 rounded-none h-10 text-white focus:ring-orange-500"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-950 border-zinc-700 text-white">
              <SelectItem value="all">All Quotes</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div
          data-testid="admin-quotes-table"
          className="border border-zinc-800 bg-zinc-900/40 overflow-hidden"
        >
          {loading ? (
            <div className="p-12 flex items-center justify-center text-zinc-400">
              <Loader2 className="h-5 w-5 animate-spin mr-3 text-orange-500" />
              Loading quotes…
            </div>
          ) : quotes.length === 0 ? (
            <div
              data-testid="admin-empty-state"
              className="p-16 text-center text-zinc-500"
            >
              <div className="font-display uppercase tracking-tight text-2xl text-zinc-300 mb-2">
                No quotes yet
              </div>
              <div className="text-sm">
                Submissions from the public site will appear here.
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-zinc-950 border-b border-zinc-800">
                  <tr className="text-left text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                    <th className="px-5 py-4">When</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {quotes.map((q) => (
                    <tr
                      key={q.id}
                      data-testid={`quote-row-${q.id}`}
                      className="hover:bg-zinc-900/60 transition-colors"
                    >
                      <td className="px-5 py-4 text-zinc-400 whitespace-nowrap">
                        {formatDate(q.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-bold text-white">
                          {q.full_name}
                        </div>
                        <div className="text-xs text-zinc-400">{q.email}</div>
                        {q.company && (
                          <div className="text-xs text-zinc-500 mt-0.5">
                            {q.company}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 text-zinc-200 max-w-[240px]">
                        <div className="text-sm font-medium">
                          {q.service_type}
                        </div>
                        <div className="text-xs text-zinc-500 truncate">
                          {q.project_details}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Select
                          value={q.status}
                          onValueChange={(v) => onStatusChange(q.id, v)}
                        >
                          <SelectTrigger
                            data-testid={`quote-status-${q.id}`}
                            className={`w-[140px] rounded-none h-8 text-xs uppercase tracking-wider font-bold border ${STATUS_STYLES[q.status]}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-950 border-zinc-700 text-white">
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {STATUS_LABELS[s]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            data-testid={`quote-view-${q.id}`}
                            onClick={() => setSelected(q)}
                            className="rounded-none border-zinc-700 bg-transparent hover:bg-zinc-800 hover:text-orange-500 text-xs uppercase tracking-wider font-bold"
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={deletingId === q.id}
                            data-testid={`quote-delete-${q.id}`}
                            onClick={() => onDelete(q.id)}
                            className="rounded-none border-zinc-700 bg-transparent hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40 text-xs uppercase tracking-wider font-bold"
                          >
                            {deletingId === q.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent
          data-testid="quote-detail-dialog"
          className="bg-zinc-950 border-zinc-800 text-white rounded-none max-w-2xl"
        >
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display uppercase tracking-tight text-2xl">
                  {selected.full_name}
                </DialogTitle>
                <DialogDescription className="text-zinc-400">
                  Quote request — {formatDate(selected.created_at)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                <Badge
                  className={`rounded-none uppercase tracking-wider text-[10px] font-bold border ${STATUS_STYLES[selected.status]}`}
                >
                  {STATUS_LABELS[selected.status]}
                </Badge>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailRow
                    icon={Mail}
                    label="Email"
                    value={
                      <a
                        href={`mailto:${selected.email}`}
                        className="hover:text-orange-500 break-all"
                      >
                        {selected.email}
                      </a>
                    }
                  />
                  <DetailRow
                    icon={Phone}
                    label="Phone"
                    value={
                      <a
                        href={`tel:${selected.phone}`}
                        className="hover:text-orange-500"
                      >
                        {selected.phone}
                      </a>
                    }
                  />
                  {selected.company && (
                    <DetailRow
                      icon={Building2}
                      label="Company"
                      value={selected.company}
                    />
                  )}
                  <DetailRow
                    icon={Filter}
                    label="Service"
                    value={selected.service_type}
                  />
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-2">
                    Project Details
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-4 text-sm text-zinc-200 whitespace-pre-wrap">
                    {selected.project_details}
                  </div>
                </div>

                <div className="text-xs text-zinc-500">
                  Preferred contact:{" "}
                  <span className="text-zinc-300 font-bold uppercase tracking-wider">
                    {selected.preferred_contact}
                  </span>
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setSelected(null)}
                  className="rounded-none border-zinc-700 bg-transparent hover:bg-zinc-900 uppercase tracking-wider text-xs font-bold"
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1.5">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="text-zinc-100 text-sm">{value}</div>
    </div>
  );
}

function formatDate(d) {
  try {
    const date = new Date(d);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return String(d);
  }
}
