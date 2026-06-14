"use client";
import { useState } from "react";
import type { Event } from "@/lib/types";
import { Trash2, Calendar, MapPin } from "lucide-react";

const eventTypeLabels: Record<Event["type"], string> = {
  weekly: "Weekly Meetup",
  dinner: "Index Dinner",
  showcase: "Index Showcase",
};

const eventTypeColors: Record<Event["type"], string> = {
  weekly: "bg-blue-100 text-blue-800",
  dinner: "bg-purple-100 text-purple-800",
  showcase: "bg-orange-100 text-orange-800",
};

export default function EventsClient({ events: initial }: { events: Event[] }) {
  const [events, setEvents] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "weekly" as Event["type"],
    date: "",
    location: "",
    description: "",
  });

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const { event } = await res.json();
      setEvents((prev) => [event, ...prev]);
      setForm({ title: "", type: "weekly", date: "", location: "", description: "" });
      setShowForm(false);
    }
    setSaving(false);
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (res.ok) setEvents((prev) => prev.filter((ev) => ev.id !== id));
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
          {showForm ? "Cancel" : "+ Create Event"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addEvent}
          className="bg-white border border-[#ddd] p-5 mb-5 grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <input
            className={inputClass}
            placeholder="Event title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <select
            className={inputClass}
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as Event["type"] })}
          >
            <option value="weekly">Weekly Meetup</option>
            <option value="dinner">Index Dinner</option>
            <option value="showcase">Index Showcase</option>
          </select>
          <input
            className={inputClass}
            type="datetime-local"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            className={inputClass}
            placeholder="Location"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <textarea
            className={`${inputClass} md:col-span-2 resize-none`}
            placeholder="Description (optional)"
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#111] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-5 py-3 hover:bg-[#c0392b] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Create Event"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {events.length === 0 ? (
          <div className="md:col-span-2 bg-white border border-[#ddd] px-6 py-12 text-center text-sm text-[#888]">
            No events yet. Create your first one above.
          </div>
        ) : (
          events.map((ev) => (
            <div key={ev.id} className="bg-white border border-[#ddd] p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 ${eventTypeColors[ev.type]}`}
                    >
                      {eventTypeLabels[ev.type]}
                    </span>
                  </div>
                  <div className="font-semibold text-[#111] mb-2">{ev.title}</div>
                  <div className="flex items-center gap-1 text-xs text-[#888] mb-1">
                    <Calendar size={11} />
                    {new Date(ev.date).toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#888]">
                    <MapPin size={11} />
                    {ev.location}
                  </div>
                  {ev.description && (
                    <p className="text-xs text-[#555] mt-2 leading-relaxed">
                      {ev.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteEvent(ev.id)}
                  className="text-[#ccc] hover:text-[#c0392b] transition-colors shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
