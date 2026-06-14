import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, whatsapp, building, link, projects } = await req.json();

  if (!name || !email || !building) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  await sql`
    INSERT INTO applications (name, email, whatsapp, building, link, projects, status)
    VALUES (
      ${name},
      ${email},
      ${whatsapp || null},
      ${building},
      ${link || null},
      ${JSON.stringify(projects ?? [])}::jsonb,
      'pending'
    )
  `;

  return NextResponse.json({ ok: true });
}
