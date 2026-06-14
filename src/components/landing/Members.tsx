import "server-only";
import sql from "@/lib/db";
import type { Member } from "@/lib/types";
import { User } from "lucide-react";

async function getFeaturedMembers(): Promise<Member[]> {
  try {
    const rows = await sql<Member[]>`
      SELECT * FROM members WHERE featured = true ORDER BY created_at ASC LIMIT 6
    `;
    return rows;
  } catch {
    return [];
  }
}

const placeholders: Member[] = [
  { id: "1", name: "Rafiq Ahmed", role: "Founder", building: "Building a fintech platform for SME lending in Bangladesh.", featured: true, avatar_url: null, created_at: "" },
  { id: "2", name: "Nadia Islam", role: "Researcher", building: "Computational linguistics at BUET. NLP for Bangla.", featured: true, avatar_url: null, created_at: "" },
  { id: "3", name: "Tanvir Hossain", role: "Engineer", building: "Two open-source tools with 3k GitHub stars. Writing about systems.", featured: true, avatar_url: null, created_at: "" },
  { id: "4", name: "Sara Khan", role: "Operator", building: "COO at a 200-person logistics company. Previously scaled ops at Shohoz.", featured: true, avatar_url: null, created_at: "" },
  { id: "5", name: "Arif Chowdhury", role: "Investor", building: "Angel investor. 12 early-stage bets in BD. Ex-founder.", featured: true, avatar_url: null, created_at: "" },
  { id: "6", name: "Mira Das", role: "Creator", building: "Documentary filmmaker. 3 films on Dhaka's informal economy.", featured: true, avatar_url: null, created_at: "" },
];

export default async function Members() {
  const members = await getFeaturedMembers();
  const display = members.length > 0 ? members : placeholders;

  return (
    <section id="members" className="bg-[#fafaf8] border-b-2 border-[#111]">
      <div className="px-5 py-14 md:px-10 md:py-20 max-w-6xl mx-auto">
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#888] mb-3">
          04 — The Network
        </div>
        <h2
          className="text-2xl md:text-3xl font-bold text-[#111] mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Some of the people you&apos;d meet.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-[#111]">
          {display.map((member) => (
            <div key={member.id} className="bg-[#fafaf8] p-6">
              <div className="w-10 h-10 bg-[#e5e2dc] flex items-center justify-center mb-4">
                <User size={18} className="text-[#888]" />
              </div>
              <div className="font-bold text-sm text-[#111] mb-0.5">{member.name}</div>
              <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#888] mb-3">
                {member.role}
              </div>
              <p className="text-xs text-[#555] leading-relaxed border-t border-[#e5e2dc] pt-3">
                {member.building}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
