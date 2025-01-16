import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/AuthServices";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "register", "/"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: [/^\/user/],
  admin: [/^\/admin/, /^\/user/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();

  const isPremium = user?.isPremium; // Check if user has premium access

  // If the user is not premium and trying to access the premium route, redirect them
  if (!isPremium && request.nextUrl.pathname === "/premium-recipe") {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to login or another page
  }
  if (!user) {
    if (!user) {
      if (AuthRoutes.includes(pathname)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL(`/login?redirect=${pathname}`, request.url)
        );
      }
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

//   return NextResponse.redirect(new URL("/home", request.url));

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/create-post", "/admin", "/user/:page*", "/premium-recipe"],
};
