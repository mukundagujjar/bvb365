// app/api/login/route.js
import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'; // Import Admin Auth and Firestore
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { idToken } = await request.json();

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    // 1. Verify the ID token to get user info (UID and Email)
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const userEmail = decodedToken.email;

    if (!userEmail) { 
      console.error("ID token does not contain an email.");
      return NextResponse.json({ error: 'Authentication failed: Email not available' }, { status: 400 });
    }

    // 2. Check if the user's email is in the allowed_users list
    const allowedUsersRef = adminFirestore.collection('allowed_users');
    // Assuming allowed_users documents have an 'email' field
    const allowedUserSnapshot = await allowedUsersRef.where('email', '==', userEmail).limit(1).get();

    if (allowedUserSnapshot.empty) {
      // Email not found in the allowed list - Unauthorized
      console.warn(`Unauthorized login attempt with email: ${userEmail}`);
      // You might want to sign out the user from Firebase Auth client-side after this
      return NextResponse.json({ error: 'Unauthorized: Email not on the allowed list' }, { status: 403 });
    }

    // Email is in the allowed list. Now check if they have a profile in the 'users' collection (by UID).
    const usersRef = adminFirestore.collection('users');
    const userDocRef = usersRef.doc(uid); // Use UID as the document ID in 'users'
    const userDocSnap = await userDocRef.get();

    let isNewUser = false;

    if (!userDocSnap.exists()) {
      // 3. Authorized user's first login - Create profile in 'users' collection
      console.log(`Authorized new user: ${userEmail} (UID: ${uid}). Creating profile.`);
      await userDocRef.set({
        email: userEmail,
        uid: uid, // Store UID explicitly as well
        createdAt: adminFirestore.FieldValue.serverTimestamp(),
        // Add other default profile fields as needed
      });
      isNewUser = true;

      // Optional: Update the allowed_user document status if tracking usage
      // allowedUserSnapshot.docs[0].ref.update({ status: 'active', uid: uid });

    } else {
      // 4. Authorized returning user - Profile already exists
      console.log(`Authorized returning user: ${userEmail} (UID: ${uid}). Profile exists.`);
      // Optional: Update last login time or other fields if needed
      // userDocRef.update({ lastLoginAt: adminFirestore.FieldValue.serverTimestamp() });
    }

    // 5. Create the session cookie for the authorized user
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ status: 'success', isNewUser: isNewUser }); // Indicate new/returning status

    // Set the session cookie as an HTTP-only cookie.
    response.cookies.set({
      name: '__session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'strict',
    });

    return response;

  } catch (error) {
    console.error("Error in /api/login:", error);
    // Handle token verification errors or other exceptions
    return NextResponse.json({ error: 'Authentication failed', details: error.message }, { status: 401 });
  }
}