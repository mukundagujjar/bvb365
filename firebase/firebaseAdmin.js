// firebase/firebaseAdmin.js
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore'; // Import getFirestore

// Option 1: Using individual environment variables
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  privateKeyId: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY, // Handle escaped newlines if necessary
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  clientId: process.env.FIREBASE_ADMIN_CLIENT_ID,
  authUri: process.env.FIREBASE_ADMIN_AUTH_URI,
  tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  authCertUrl: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  clientCertUrl: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN, // Add this if using the latest admin SDK
};

let adminApp;

if (getApps().length === 0) {
  try {
    adminApp = initializeApp({
      credential: cert(serviceAccount),
    });
  } catch (error) {
    console.error("Failed to initialize Firebase Admin App:", error);
    // Depending on your needs, you might want to throw the error or handle it
  }
} else {
  adminApp = getApps()[0]; // Use the existing app instance
}

// Get the Admin Auth instance
const adminAuth = getAuth(adminApp);

// Get the Admin Firestore instance
const adminFirestore = getFirestore(adminApp); // Get the Firestore instance

// Export all necessary instances
export { adminApp, adminAuth, adminFirestore }; // Export adminFirestore