"use client";
import { useState } from "react";
import type { Application, ApplicationStatus } from "@/lib/types";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

type Project = { name: string; url: string };

const statusColors: Record<ApplicationStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function ApplicationsClient({
  applications: initial,
}: {
  applications: Application[];
}) {
  const [items, setItems] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");

  const updateStatus = async (id: string, status: ApplicationStatus) => {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const filtered = filter === "all" ? items : items.filter((a) => a.status === filter);

  return (
    <div>
      <div className="flex gap-1 mb-4 flex-wrap">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-[10px] font-bold tracking-[1px] uppercase border transition-colors ${
              filter === f
                ? "bg-[#111] text-[#fafaf8] border-[#111]"
                : "bg-white text-[#888] border-[#ddd] hover:border-[#111] hover:text-[#111]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#ddd] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-[#888]">No applications found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111] text-[#fafaf8]">
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase">Applicant</th>
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase hidden md:table-cell">Building</th>
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase">Status</th>
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => {
                const projects: Project[] = Array.isArray(app.projects)
                  ? app.projects
                  : typeof app.projects === "string"
                  ? JSON.parse(app.projects)
                  : [];
                const hasProjects = projects.some((p) => p.name || p.url);

                return (
                  <>
                    <tr key={app.id} className="border-b border-[#f0f0f0] hover:bg-[#fafaf8] transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#111]">{app.name}</div>
                        <div className="text-xs text-[#888]">{app.email}</div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="text-xs text-[#555] max-w-[200px] truncate">{app.building}</div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-xs text-[#888]">
                        {new Date(app.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-[9px] font-bold tracking-[1px] uppercase ${statusColors[app.status]}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {app.status !== "approved" && (
                            <button onClick={() => updateStatus(app.id, "approved")} className="text-[10px] font-bold text-green-700 hover:underline">
                              Approve
                            </button>
                          )}
                          {app.status !== "rejected" && (
                            <button onClick={() => updateStatus(app.id, "rejected")} className="text-[10px] font-bold text-[#c0392b] hover:underline">
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                            className="text-[#888] hover:text-[#111] transition-colors"
                          >
                            {expanded === app.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expanded === app.id && (
                      <tr key={`${app.id}-exp`} className="bg-[#fafaf8] border-b border-[#f0f0f0]">
                        <td colSpan={5} className="px-4 py-4">
                          <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#888] mb-1">What they&apos;re building</div>
                          <p className="text-sm text-[#333] mb-4">{app.building}</p>

                          {hasProjects && (
                            <>
                              <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#888] mb-2">Projects</div>
                              <div className="flex flex-col gap-2">
                                {projects.filter((p) => p.name || p.url).map((p, i) => (
                                  <div key={i} className="flex items-center gap-3">
                                    {p.name && <span className="text-sm font-semibold text-[#111]">{p.name}</span>}
                                    {p.url && (
                                      <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-[#c0392b] hover:underline"
                                      >
                                        <ExternalLink size={11} />
                                        {p.url}
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </>
                          )}

                          {!hasProjects && app.link && (
                            <a href={app.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#c0392b] hover:underline">
                              <ExternalLink size={11} /> {app.link}
                            </a>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
