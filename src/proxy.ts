import { verifyPayloadJWT } from '@/lib/verifyJWT'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// 1. Specify public routes
const publicAuthRoutes = [
  '/account/create',
  '/account/login',
  '/account/verify',
]

export default async function proxy(request: NextRequest) {
  // 2. Check if the current route is a public auth route
  const path = request.nextUrl.pathname
  const isPublicAuthRoute = publicAuthRoutes.includes(path)

  // 3. Verify a session exists via the cookie and isn't expired
  const cookie = (await cookies()).get('payload-token')?.value
  const session = await verifyPayloadJWT(cookie)

  // 4. Redirect to /login if the user is not authenticated
  if (!isPublicAuthRoute && !session) {
    return NextResponse.redirect(new URL('/account/login', request.nextUrl))
  }

  // 5. Redirect to /account if the user is authenticated
  if (isPublicAuthRoute && session) {
    return NextResponse.redirect(new URL('/account', request.nextUrl))
  }

  // Allow route
  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*'],
}
