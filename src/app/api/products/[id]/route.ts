import { NextRequest, NextResponse } from "next/server";
import { FirestoreService } from "@/lib/firebase/firestore";
import { verifyAuthToken } from "@/lib/utils/auth";
import { productSchema } from "../route";
import { z } from "zod";

export const productUpdateSchema = productSchema.partial();

// ✅ GET /api/products/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: productId } = await context.params;

    const product = await FirestoreService.getProductById(userId, productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with ID ${productId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error(`Get product by ID error:`, error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ✅ PATCH /api/products/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: productId } = await context.params;
    const body = await request.json();
    const validated = productUpdateSchema.parse(body);

    const product = await FirestoreService.updateProduct(productId, validated);

    return NextResponse.json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error: any) {
    console.error("Update product error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: productId } = await context.params;
    await FirestoreService.deleteProduct(productId);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
