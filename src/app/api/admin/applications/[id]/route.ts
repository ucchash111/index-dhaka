import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();

  await sql`UPDATE applications SET status = ${status} WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
