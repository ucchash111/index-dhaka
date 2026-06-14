import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLogoutRoute = pathname === "/admin/logout";
  const isApiLogin = pathname === "/api/admin/login";

  if (!isAdminRoute || isLoginPage || isLogoutRoute || isApiLogin) {
    return NextResponse.next();
  }

  // Quick existence check in Edge runtime — real value validation happens in the layout
  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
