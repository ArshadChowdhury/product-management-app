import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/firebase/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// POST /api/auth — Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...credentials } = body;

    const validated = loginSchema.parse(credentials);
    const result = await AuthService.signIn(
      validated.email,
      validated.password
    );

    return NextResponse.json({
      success: true,
      data: {
        token: result.token,
        user: {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
        },
      },
    });
  } catch (error: any) {
    console.error("Auth error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Authentication failed" },
      { status: 401 }
    );
  }
}

// DELETE /api/auth — Logout
export async function DELETE() {
  try {
    await AuthService.signOut();

    return NextResponse.json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Logout failed" },
      { status: 500 }
    );
  }
}
