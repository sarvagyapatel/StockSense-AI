import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { authLimiter, searchLimiter, aiLimiter } from "@/lib/rateLimit";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  return request.headers.get("user-agent") ?? "unknown-client";
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const clientId = getClientIdentifier(request);

  if (
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/register")
  ) {
    const { success } = await authLimiter.limit(clientId);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many authentication attempts. Try again later.",
        },
        { status: 429 }
      );
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/api/stocks/search")) {
    const { success } = await searchLimiter.limit(clientId);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "Search rate limit exceeded.",
        },
        { status: 429 }
      );
    }
  }

  if (pathname.includes("/insights")) {
    const { success } = await aiLimiter.limit(clientId);

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message: "AI request limit exceeded.",
        },
        { status: 429 }
      );
    }
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId as string);
    requestHeaders.set("x-user-email", payload.email as string);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/login",
    "/api/register",
    "/api/watchlist/:path*",
    "/api/stocks/:path*",
  ],
};