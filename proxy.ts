import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { R } from "@/constants/R";
import {
  getDashboardRouteByRole,
  isSuperAdminPath,
  isSuperAdminRole,
  normalizeUserRole,
} from "@/lib/auth";

function redirectTo(request: NextRequest, pathname: string) {
  return NextResponse.redirect(new URL(pathname, request.url));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = normalizeUserRole(request.cookies.get("role")?.value);
  const isProtectedRoute = pathname.startsWith(R.protected.prefix);
  const isSuperAdminRoute = isSuperAdminPath(pathname);

  if (!token || !role) {
    if (isProtectedRoute) {
      return redirectTo(request, R.auth.prefix);
    }
    return NextResponse.next();
  }
  if (pathname === R.auth.prefix) {
    return redirectTo(request, getDashboardRouteByRole(role));
  }
  if (pathname === R.protected.prefix) {
    return redirectTo(request, getDashboardRouteByRole(role));
  }
  if (!isSuperAdminRole(role) && isSuperAdminRoute) {
    return redirectTo(request, R.protected.admin.prefix);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/protected/:path*"],
};
