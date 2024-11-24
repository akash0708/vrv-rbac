import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    console.log(request.nextUrl.pathname); // Logs the requested path

    // if (
    //   request.nextUrl.pathname.startsWith("/login") ||
    //   request.nextUrl.pathname.startsWith("/signup")
    // ) {
    //   const redirectUrl = request.headers.get("referer") || "/";
    //   return NextResponse.redirect(new URL(redirectUrl, request.url));
    // }

    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (
        request.nextauth.token?.role !== "ADMIN" &&
        request.nextauth.token?.role !== "SUPERADMIN"
      ) {
        return NextResponse.rewrite(new URL("/", request.url));
        // console.log(request.nextauth.token?.role);
      }
    }

    if (request.nextUrl.pathname.startsWith("/superadmin")) {
      if (request.nextauth.token?.role !== "SUPERADMIN") {
        console.log(request.nextauth.token?.role);
        console.log(request.nextUrl.pathname);
        return NextResponse.rewrite(new URL("/", request.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin", "/superadmin"],
};
