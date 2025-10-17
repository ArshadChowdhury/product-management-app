import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { db } from "./config";
import { Product } from "../../types/product";

export const FirestoreService = {
  async getProducts(
    userId: string,
    { category, search, pageSize = 3, page = 1 }: any
  ) {
    const productsRef = collection(db, "products");

    // Start with user filter only (avoid composite indexes)
    let q = query(
      productsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc") // or any sortable field
    );

    // Apply only one additional filter (no multiple "where" chaining)
    if (category) {
      q = query(
        productsRef,
        where("userId", "==", userId),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
    }

    // Get all matching docs first (to count total)
    const allSnapshot = await getDocs(q);

    let allProducts = allSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optional local filtering (avoids Firestore composite indexes)
    if (search) {
      allProducts = allProducts.filter((p: any) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination logic (client-side)
    const totalCount = allProducts.length;
    const start = (page - 1) * pageSize;
    const paginatedProducts = allProducts.slice(start, start + pageSize);

    return {
      products: paginatedProducts,
      count: totalCount,
    };
  },

  async getProductById(
    userId: string,
    productId: string
  ): Promise<Product | null> {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null; // Product not found
    }

    const data = docSnap.data() as Omit<Product, "id"> & DocumentData;

    // Crucial Ownership Check: Ensure the user owns the product before returning it
    if (data.userId !== userId) {
      // You could throw an error or return null/undefined based on desired behavior
      // Returning null for a soft fail, or throw for a hard fail (e.g., 403 Forbidden logic)
      // For security, it's safer to treat it as not found or unauthorized.
      throw new Error("Unauthorized to access this product.");
    }

    return {
      id: docSnap.id,
      ...data,
    };
  },

  async createProduct(userId: string, data: any) {
    const newDoc = await addDoc(collection(db, "products"), {
      ...data,
      userId,
      createdAt: Date.now(),
    });
    return { id: newDoc.id, ...data };
  },

  async updateProduct(id: string, data: any) {
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, data);
    return { id, ...data };
  },

  async deleteProduct(id: string) {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
  },
};
