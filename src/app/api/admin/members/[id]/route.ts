import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { featured } = await req.json();

  await sql`UPDATE members SET featured = ${featured} WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await sql`DELETE FROM members WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
