export const dynamic = "force-dynamic";
import sql from "@/lib/db";
import type { Member } from "@/lib/types";
import MembersClient from "./MembersClient";

async function getMembers(): Promise<Member[]> {
  try {
    return await sql<Member[]>`SELECT * FROM members ORDER BY created_at DESC`;
  } catch {
    return [];
  }
}

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: "var(--font-playfair)" }}>
          Members
        </h1>
        <p className="text-sm text-[#888] mt-1">Manage member profiles and directory.</p>
      </div>
      <MembersClient members={members} />
    </div>
  );
}
