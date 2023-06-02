import { NextResponse } from "next/server";
import type {
  NextRequest,
  NextResponse as NextResponseType,
} from "next/server";

export async function middleware(req: NextRequest): Promise<NextResponseType> {
  const hasCookie = req.cookies.has("user-email");

  if (!hasCookie) {
    const signinUrl = new URL("/landing?modal=login", req.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/:path*", "/", "/movies", "/movies/:path*"],
};
