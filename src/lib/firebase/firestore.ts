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
  limit,
  startAfter,
  DocumentData,
  QueryConstraint,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Product, CreateProductDto, UpdateProductDto } from "@/types/product";

const PRODUCTS_COLLECTION = "products";

// export class FirestoreService {
//   // Get all products with optional filters
//   static async getProducts(
//     userId: string,
//     filters?: {
//       category?: string;
//       search?: string;
//       pageSize?: number;
//       lastDoc?: any;
//     }
//   ): Promise<{ products: Product[]; lastDoc: any }> {
//     try {
//       const constraints: QueryConstraint[] = [
//         where("userId", "==", userId),
//         orderBy("createdAt", "desc"),
//       ];

//       if (filters?.category && filters.category !== "all") {
//         constraints.push(where("category", "==", filters.category));
//       }

//       if (filters?.pageSize) {
//         constraints.push(limit(filters.pageSize));
//       }

//       if (filters?.lastDoc) {
//         constraints.push(startAfter(filters.lastDoc));
//       }

//       const q = query(collection(db, PRODUCTS_COLLECTION), ...constraints);
//       const querySnapshot = await getDocs(q);

//       let products = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//         createdAt: doc.data().createdAt?.toDate().toISOString(),
//         updatedAt: doc.data().updatedAt?.toDate().toISOString(),
//       })) as Product[];

//       // Client-side search filter
//       if (filters?.search) {
//         const searchLower = filters.search.toLowerCase();
//         products = products.filter((p) =>
//           p.name.toLowerCase().includes(searchLower)
//         );
//       }

//       const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

//       return { products, lastDoc: lastVisible };
//     } catch (error: any) {
//       throw new Error(`Failed to fetch products: ${error.message}`);
//     }
//   }

//   // Get single product
//   static async getProduct(productId: string): Promise<Product | null> {
//     try {
//       const docRef = doc(db, PRODUCTS_COLLECTION, productId);
//       const docSnap = await getDoc(docRef);

//       if (!docSnap.exists()) {
//         return null;
//       }

//       return {
//         id: docSnap.id,
//         ...docSnap.data(),
//         createdAt: docSnap.data().createdAt?.toDate().toISOString(),
//         updatedAt: docSnap.data().updatedAt?.toDate().toISOString(),
//       } as Product;
//     } catch (error: any) {
//       throw new Error(`Failed to fetch product: ${error.message}`);
//     }
//   }

//   // Create product
//   static async createProduct(
//     userId: string,
//     productData: CreateProductDto
//   ): Promise<Product> {
//     try {
//       const now = Timestamp.now();
//       const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
//         ...productData,
//         userId,
//         createdAt: now,
//         updatedAt: now,
//       });

//       const newProduct = await this.getProduct(docRef.id);
//       if (!newProduct) throw new Error("Failed to retrieve created product");

//       return newProduct;
//     } catch (error: any) {
//       throw new Error(`Failed to create product: ${error.message}`);
//     }
//   }

//   // Update product
//   static async updateProduct(
//     productId: string,
//     productData: UpdateProductDto
//   ): Promise<Product> {
//     try {
//       const docRef = doc(db, PRODUCTS_COLLECTION, productId);
//       await updateDoc(docRef, {
//         ...productData,
//         updatedAt: Timestamp.now(),
//       });

//       const updatedProduct = await this.getProduct(productId);
//       if (!updatedProduct)
//         throw new Error("Failed to retrieve updated product");

//       return updatedProduct;
//     } catch (error: any) {
//       throw new Error(`Failed to update product: ${error.message}`);
//     }
//   }

//   // Delete product
//   static async deleteProduct(productId: string): Promise<void> {
//     try {
//       await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
//     } catch (error: any) {
//       throw new Error(`Failed to delete product: ${error.message}`);
//     }
//   }

//   // Get products by category
//   static async getProductsByCategory(
//     userId: string,
//     category: string
//   ): Promise<Product[]> {
//     try {
//       const q = query(
//         collection(db, PRODUCTS_COLLECTION),
//         where("userId", "==", userId),
//         where("category", "==", category),
//         orderBy("createdAt", "desc")
//       );

//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//         createdAt: doc.data().createdAt?.toDate().toISOString(),
//         updatedAt: doc.data().updatedAt?.toDate().toISOString(),
//       })) as Product[];
//     } catch (error: any) {
//       throw new Error(`Failed to fetch products by category: ${error.message}`);
//     }
//   }
// }

export const FirestoreService = {
  async getProducts(userId: string, { category, search, pageSize }: any) {
    const productsRef = collection(db, "products");

    // Start with user filter only (avoid composite indexes)
    let q = query(
      productsRef,
      where("userId", "==", userId),
      limit(pageSize || 10)
    );

    // Apply only one additional filter (no multiple "where" chaining)
    if (category) {
      q = query(
        productsRef,
        where("category", "==", category),
        limit(pageSize || 10)
      );
    }

    const snapshot = await getDocs(q);

    let products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optional local filtering (avoids Firestore composite indexes)
    if (search) {
      products = products.filter((p: any) =>
        p.name?.toLowerCase().includes(search)
      );
    }

    return { products };
  },

  async getProduct(id: string) {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
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
