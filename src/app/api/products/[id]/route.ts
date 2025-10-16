import { NextRequest, NextResponse } from "next/server";
import { FirestoreService } from "@/lib/firebase/firestore";
import { verifyAuthToken } from "@/lib/utils/auth";
import { productSchema } from "../route";
import { z } from "zod";

export const productUpdateSchema = productSchema.partial();

// ✅ GET /api/products/[id] – Get product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // <-- Extracts the ID from the URL path
) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const productId = params.id;

    // Call the service to fetch the product
    const product = await FirestoreService.getProductById(userId, productId);

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with ID ${productId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    console.error(`Get product by ID error for ${params.id}:`, error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ✅ PATCH /api/products/[id] – Update product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // <-- New: Access the product ID
) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const productId = params.id; // Get the ID from the URL
    const body = await request.json();

    // 🛑 IMPORTANT: Use a schema that makes all fields optional for PATCH
    const validated = productUpdateSchema.parse(body);

    // Pass the productId along with the validated data
    const product = await FirestoreService.updateProduct(
      productId, // <-- Pass the ID to the service
      validated
    );

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update product error:", error); // Changed log message

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

// ✅ DELETE /api/products/[id] – DELETE product

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // Access the product ID
) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const productId = params.id; // Get the ID from the URL

    await FirestoreService.deleteProduct(productId); // Pass userId for ownership check

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete product error:", error);

    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
