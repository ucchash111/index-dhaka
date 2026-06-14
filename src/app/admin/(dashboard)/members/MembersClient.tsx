"use client";
import { useState } from "react";
import type { Member } from "@/lib/types";
import { Trash2, Star, User } from "lucide-react";

export default function MembersClient({
  members: initial,
}: {
  members: Member[];
}) {
  const [members, setMembers] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", building: "" });
  const [saving, setSaving] = useState(false);

  const toggleFeatured = async (id: string, featured: boolean) => {
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

  const deleteMember = async (id: string) => {
    if (!confirm("Remove this member?")) return;
    const res = await fetch(`/api/admin/members/${id}`, { method: "DELETE" });
    if (res.ok) setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const addMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const { member } = await res.json();
      setMembers((prev) => [member, ...prev]);
      setForm({ name: "", role: "", building: "" });
      setShowForm(false);
    }
    setSaving(false);
  };

  const inputClass =
    "w-full border border-[#ddd] bg-white px-3 py-2 text-sm focus:outline-none focus:border-[#111] transition-colors";

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#111] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-5 py-3 hover:bg-[#c0392b] transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Member"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addMember}
          className="bg-white border border-[#ddd] p-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <input
            className={inputClass}
            placeholder="Full name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Role (e.g. Founder, Researcher)"
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="What they're building"
            required
            value={form.building}
            onChange={(e) => setForm({ ...form, building: e.target.value })}
          />
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#111] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-5 py-3 hover:bg-[#c0392b] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Add Member"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-[#ddd] overflow-hidden">
        {members.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-[#888]">
            No members yet. Add your first member above.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111] text-[#fafaf8]">
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase">
                  Member
                </th>
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase hidden md:table-cell">
                  Building
                </th>
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase">
                  Featured
                </th>
                <th className="text-left px-4 py-3 text-[9px] font-bold tracking-[2px] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-[#f0f0f0] hover:bg-[#fafaf8] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#e5e2dc] flex items-center justify-center shrink-0">
                        <User size={14} className="text-[#888]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#111]">
                          {member.name}
                        </div>
                        <div className="text-[9px] tracking-[1px] uppercase text-[#888]">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-xs text-[#555] max-w-[240px]">
                      {member.building}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(member.id, member.featured)}
                      className={`transition-colors ${member.featured ? "text-yellow-500" : "text-[#ccc] hover:text-yellow-400"}`}
                    >
                      <Star size={16} fill={member.featured ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteMember(member.id)}
                      className="text-[#ccc] hover:text-[#c0392b] transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
