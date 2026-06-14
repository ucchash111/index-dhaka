"use client";
import { useState } from "react";
import type { Member } from "@/lib/types";
import { Star, User } from "lucide-react";

export default function FeaturedClient({ members: initial }: { members: Member[] }) {
  const [members, setMembers] = useState(initial);

  const toggle = async (id: string, featured: boolean) => {
    const res = await fetch(`/api/admin/members/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !featured }),
    });
    if (res.ok) {
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, featured: !featured } : m))
      );
    }
  };

  const featured = members.filter((m) => m.featured);
  const rest = members.filter((m) => !m.featured);

  const MemberCard = ({ member }: { member: Member }) => (
    <div
      className={`flex items-center gap-4 p-4 border transition-colors ${
        member.featured
          ? "bg-yellow-50 border-yellow-200"
          : "bg-white border-[#ddd]"
      }`}
    >
      <div className="w-9 h-9 bg-[#e5e2dc] flex items-center justify-center shrink-0">
        <User size={14} className="text-[#888]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-[#111]">{member.name}</div>
        <div className="text-[9px] tracking-[1px] uppercase text-[#888]">
          {member.role}
        </div>
      </div>
      <button
        onClick={() => toggle(member.id, member.featured)}
        className={`shrink-0 transition-colors ${
          member.featured
            ? "text-yellow-500 hover:text-[#888]"
            : "text-[#ccc] hover:text-yellow-400"
        }`}
        title={member.featured ? "Remove from featured" : "Add to featured"}
      >
        <Star size={18} fill={member.featured ? "currentColor" : "none"} />
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Featured */}
      <div>
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#888] mb-3">
          Featured on site ({featured.length})
        </div>
        <div className="flex flex-col gap-2">
          {featured.length === 0 ? (
            <div className="bg-white border border-[#ddd] px-5 py-8 text-center text-sm text-[#888]">
              No featured members yet.
            </div>
          ) : (
            featured.map((m) => <MemberCard key={m.id} member={m} />)
          )}
        </div>
      </div>

      {/* Rest */}
      <div>
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#888] mb-3">
          All members ({rest.length})
        </div>
        <div className="flex flex-col gap-2">
          {rest.length === 0 ? (
            <div className="bg-white border border-[#ddd] px-5 py-8 text-center text-sm text-[#888]">
              All members are featured.
            </div>
          ) : (
            rest.map((m) => <MemberCard key={m.id} member={m} />)
          )}
        </div>
      </div>
    </div>
  );
}
