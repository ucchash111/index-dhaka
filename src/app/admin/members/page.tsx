export const dynamic = "force-dynamic";
import { supabaseAdmin } from "@/lib/supabase";
import type { Member } from "@/lib/types";
import MembersClient from "./MembersClient";

async function getMembers(): Promise<Member[]> {
  try {
    const { data } = await supabaseAdmin
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-black text-[#111]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Members
          </h1>
          <p className="text-sm text-[#888] mt-1">
            Manage member profiles and directory.
          </p>
        </div>
      </div>
      <MembersClient members={members} />
    </div>
  );
}
