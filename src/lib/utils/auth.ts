import { NextRequest } from "next/server";
import { getAuth } from "firebase-admin/auth";
import * as admin from "firebase-admin";

// Initialize Firebase Admin (server-side only)
if (!admin.apps.length) {
  admin.initializeApp({
    // Best practice: Admin SDK credentials should *not* use NEXT_PUBLIC variables.
    // They should be secret and accessed only on the server.
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID, // Use non-public name
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Ensure the private key is handled correctly for multi-line JSON
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function verifyAuthToken(
  request: NextRequest
): Promise<string | null> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);

    // This line uses the initialized Admin SDK to securely verify the token.
    const decodedToken = await getAuth().verifyIdToken(token);

    return decodedToken.uid;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
