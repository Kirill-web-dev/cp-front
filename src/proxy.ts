import { NextResponse, type NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { url, cookies } = request;
  const UID = cookies.get("UID")?.value;
  const isAuthPage = url.includes("/a");

  if (isAuthPage) {
    if (UID) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!UID) {
    return NextResponse.redirect(new URL("/a/login", request.url));
  }
}

export const config = {
  matcher: ["/a/:path*", "/friends/:path*", "/teams/:path*", "/tasks/:path*", "/settings/:path*"],
};
