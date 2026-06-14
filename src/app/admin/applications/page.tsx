export const dynamic = "force-dynamic";
import { supabaseAdmin } from "@/lib/supabase";
import type { Application } from "@/lib/types";
import ApplicationsClient from "./ApplicationsClient";

async function getApplications(): Promise<Application[]> {
  try {
    const { data } = await supabaseAdmin
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function ApplicationsPage() {
  const applications = await getApplications();

  const pending = applications.filter((a) => a.status === "pending").length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1
          className="text-2xl font-black text-[#111]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Applications
        </h1>
        <p className="text-sm text-[#888] mt-1">
          Review and approve incoming membership applications.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Pending", value: pending, color: "#f0c040" },
          { label: "Approved", value: approved, color: "#44c87a" },
          { label: "Rejected", value: rejected, color: "#c0392b" },
          { label: "Total", value: applications.length, color: "#111" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-[#ddd] p-4">
            <div
              className="text-3xl font-black"
              style={{ fontFamily: "var(--font-playfair)", color }}
            >
              {value}
            </div>
            <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#888] mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      <ApplicationsClient applications={applications} />
    </div>
  );
}
