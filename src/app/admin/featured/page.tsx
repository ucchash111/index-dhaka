export const dynamic = "force-dynamic";
import { supabaseAdmin } from "@/lib/supabase";
import type { Member } from "@/lib/types";
import FeaturedClient from "./FeaturedClient";

async function getMembers(): Promise<Member[]> {
  try {
    const { data } = await supabaseAdmin
      .from("members")
      .select("*")
      .order("name", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function FeaturedPage() {
  const members = await getMembers();
  const featured = members.filter((m) => m.featured);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1
          className="text-2xl font-black text-[#111]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Featured Members
        </h1>
        <p className="text-sm text-[#888] mt-1">
          Control which members appear on the public landing page.{" "}
          <span className="font-semibold text-[#111]">
            {featured.length} featured
          </span>{" "}
          of {members.length} total.
        </p>
      </div>
      <FeaturedClient members={members} />
    </div>
  );
}
