import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/lib/session";
import { cookies } from 'next/headers'

const protectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}