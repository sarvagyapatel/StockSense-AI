import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/watchlist/:path*",
    "/api/stocks/:path*"
  ]
};
