import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { title, type, date, location, description } = await req.json();

  const { data, error } = await supabaseAdmin
    .from("events")
    .insert({ title, type, date, location, description })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ event: data });
}
