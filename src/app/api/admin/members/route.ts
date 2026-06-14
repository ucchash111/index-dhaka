import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import type { Member } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { name, role, building } = await req.json();

  const [member] = await sql<Member[]>`
    INSERT INTO members (name, role, building, featured)
    VALUES (${name}, ${role}, ${building}, false)
    RETURNING *
  `;

  return NextResponse.json({ member });
}
