"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchProductById,
  deleteProduct,
  clearSelectedProduct,
} from "@/store/slices/productsSlice";
import {
  ArrowLeft,
  ShoppingBag,
  Edit2,
  Trash2,
  Loader2,
  Package,
  DollarSign,
  Tag,
} from "lucide-react";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading } = useAppSelector(
    (state) => state.products
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductById(params.id as string));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [params.id, dispatch]);

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await dispatch(deleteProduct(selectedProduct.id)).unwrap();
      toast.success("Product deleted successfully");
      router.push("/products");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  if (loading || !selectedProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              onClick={() => router.push("/products")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">ProductHub</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Header Image */}
          <div className="relative h-72 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            {selectedProduct.imageUrl ? (
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="w-32 h-32 text-white opacity-40" />
              </div>
            )}
            <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {selectedProduct.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedProduct.name}
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <p className="text-sm font-semibold text-blue-600">Price</p>
                </div>
                <p className="text-3xl font-bold text-blue-700">
                  ${selectedProduct.price.toFixed(2)}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-6 h-6 text-purple-600" />
                  <p className="text-sm font-semibold text-purple-600">
                    Stock Available
                  </p>
                </div>
                <p className="text-3xl font-bold text-purple-700">
                  {selectedProduct.stock}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Tag className="w-6 h-6 text-pink-600" />
                  <p className="text-sm font-semibold text-pink-600">
                    Category
                  </p>
                </div>
                <p className="text-2xl font-bold text-pink-700">
                  {selectedProduct.category}
                </p>
              </motion.div>
            </div>

            {/* Metadata */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(selectedProduct.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div>
                {/* <div>
                  <span className="font-semibold">Last Updated:</span>{" "}
                  {new Date(selectedProduct.updatedAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </div> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  router.push(`/products/edit/${selectedProduct.id}`)
                }
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Edit2 className="w-5 h-5" />
                <span>Edit Product</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-50 text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-200"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loading}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
}
