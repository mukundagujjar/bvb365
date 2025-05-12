// app/api/logout/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Access cookies in App Router server components/routes
import { adminAuth } from '@/firebase/firebaseAdmin'; // Optional: Revoke token server-side

export async function POST(request) {
   const cookieStore = await cookies();
   const sessionCookie = cookieStore.get('__session')?.value;

   // Optional: Revoke the session cookie server-side (requires Admin SDK)
   if (sessionCookie) {
       try {
           const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
           await adminAuth.revokeRefreshTokens(decodedClaims.sub);
           console.log("Refreshed tokens revoked");
       } catch (error) {
           console.error("Error revoking tokens:", error);
           // Continue clearing the cookie even if token revocation fails
       }
   }


   // Delete the session cookie on the client side
   cookieStore.delete('__session'); // Use the same name as in api/login/route.js

   return NextResponse.json({ status: 'signed out' });
}