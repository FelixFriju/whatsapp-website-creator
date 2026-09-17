import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("websites")
    .update({ status: "published" })
    .eq("id", id)
    .select("slug")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(
    new URL(`/${data.slug}`, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  );
}
