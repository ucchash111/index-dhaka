import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, building, link } = await req.json();

  if (!name || !email || !building) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await sql`
    INSERT INTO applications (name, email, building, link, status)
    VALUES (${name}, ${email}, ${building}, ${link || null}, 'pending')
  `;

  return NextResponse.json({ ok: true });
}
