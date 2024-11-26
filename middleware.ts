import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    // console.log(request.nextUrl.pathname);

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
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin", "/superadmin", "/register", "/dashboard"],
};
