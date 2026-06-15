import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, whatsapp, building, link, projects, referred_by } = await req.json();

  if (!name || !email || !building) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await sql`
    INSERT INTO applications (name, email, whatsapp, building, link, projects, referred_by, status)
    VALUES (
      ${name},
      ${email},
      ${whatsapp || null},
      ${building},
      ${link || null},
      ${JSON.stringify(projects ?? [])}::jsonb,
      ${referred_by || null},
      'pending'
    )
  `;

  return NextResponse.json({ ok: true });
}
