import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { verifyAuthToken } from "@/lib/utils/auth";
import { FirestoreService } from "@/lib/firebase/firestore";
import { db } from "@/lib/firebase/config";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock must be 0 or greater"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.union([z.string().url("Invalid URL"), z.literal("")]).optional(),
});

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const pageSize = parseInt(searchParams.get("pageSize") || "3");
    const page = parseInt(searchParams.get("page") || "1");

    const { products, count } = await FirestoreService.getProducts(userId, {
      category,
      search,
      pageSize,
      page,
    });

    return NextResponse.json({
      success: true,
      data: products,
      count,
    });
  } catch (error: any) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create product
export async function POST(request: NextRequest) {
  try {
    const userId = await verifyAuthToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = productSchema.parse(body);

    const product = await FirestoreService.createProduct(userId, validated);

    return NextResponse.json(
      {
        success: true,
        data: product,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create product error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
