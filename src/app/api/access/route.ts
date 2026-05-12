import { NextResponse } from "next/server";
import { clearAccessCookie, setAccessCookie } from "@/lib/cookie";

export async function POST() {
  await setAccessCookie();
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  await clearAccessCookie();
  return NextResponse.json({ success: true });
}