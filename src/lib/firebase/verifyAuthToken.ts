import { NextRequest } from "next/server";
import { adminAuth } from "./admin";

export async function verifyAuthToken(
  request: NextRequest
): Promise<string | null> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
