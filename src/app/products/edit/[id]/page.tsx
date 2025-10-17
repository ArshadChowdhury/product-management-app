// "use client";

// import { useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import {
//   fetchProductById,
//   clearSelectedProduct,
// } from "@/store/slices/productsSlice";
// import ProductForm from "@/components/ProductForm";
// import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";

// export default function EditProductPage() {
//   const router = useRouter();
//   const params = useParams();
//   const dispatch = useAppDispatch();
//   const { selectedProduct, loading } = useAppSelector(
//     (state) => state.products
//   );

//   useEffect(() => {
//     if (params.id) {
//       dispatch(fetchProductById(params.id as string));
//     }

//     return () => {
//       dispatch(clearSelectedProduct());
//     };
//   }, [params.id, dispatch]);

//   if (loading || !selectedProduct) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading product...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center h-16 gap-4">
//             <button
//               onClick={() => router.push(`/products/${params.id}`)}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
//             >
//               <ArrowLeft className="w-5 h-5" />
//               <span className="font-medium">Back</span>
//             </button>
//             <div className="flex items-center gap-2">
//               <ShoppingBag className="w-5 h-5 text-blue-600" />
//               <span className="font-semibold text-gray-900">ProductHub</span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <ProductForm mode="edit" product={selectedProduct} />
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter, useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProducts";
import ProductForm from "@/components/ProductForm";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const { data: product, isLoading } = useProduct(params.id as string);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-kobicha">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Product not found
          </h3>
          <button
            onClick={() => router.push("/products")}
            className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              onClick={() => router.push(`/products/${params.id}`)}
              className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sepia" />
              <span className="font-semibold text-gray-900">ProductHub</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm mode="edit" product={product} />
      </div>
    </div>
  );
}
