import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessGranted = request.cookies.get("access_granted")?.value === "true";

  if (!accessGranted) {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/haunted-house", "/haunted-house/:path*"],
};