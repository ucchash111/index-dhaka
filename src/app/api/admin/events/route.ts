import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import type { Event } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { title, type, date, location, description } = await req.json();

  const [event] = await sql<Event[]>`
    INSERT INTO events (title, type, date, location, description)
    VALUES (${title}, ${type}, ${date}, ${location}, ${description || ""})
    RETURNING *
  `;

  return NextResponse.json({ event });
}
