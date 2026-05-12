import { NextResponse } from "next/server";

const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "access_granted",
    value: "true",
    path: "/haunted-house",
    maxAge: 60 * 60,
    ...ACCESS_COOKIE_OPTIONS,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: "access_granted",
    value: "",
    path: "/haunted-house",
    maxAge: 0,
    ...ACCESS_COOKIE_OPTIONS,
  });

  return response;
}