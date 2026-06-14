export const dynamic = "force-dynamic";
import sql from "@/lib/db";
import type { Event } from "@/lib/types";
import EventsClient from "./EventsClient";

async function getEvents(): Promise<Event[]> {
  try {
    return await sql<Event[]>`SELECT * FROM events ORDER BY date ASC`;
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: "var(--font-playfair)" }}>
          Events
        </h1>
        <p className="text-sm text-[#888] mt-1">Manage upcoming meetups, dinners, and showcases.</p>
      </div>
      <EventsClient events={events} />
    </div>
  );
}
