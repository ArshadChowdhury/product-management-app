"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProduct, useDeleteProduct } from "../../../hooks/useProducts";
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
import DeleteModal from "../../../components/DeleteModal";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: product, isLoading, error } = useProduct(params.id as string);
  const deleteMutation = useDeleteProduct();

  const handleDelete = async () => {
    if (!product) return;

    try {
      await deleteMutation.mutateAsync(product.id);
      router.push("/products");
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-kobicha mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Product not found
          </h3>
          <p className="text-gray-600 mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer"
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              onClick={() => router.push("/products")}
              className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sepia" />
              <span className="font-semibold text-gray-900">
                Product Catalog
              </span>
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
          <div className="relative h-72 bg-gradient-to-br from-kobicha to-walnut-brown">
            {product.imageUrl ? (
              <Image
                fill
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ShoppingBag className="w-16 h-16 text-white opacity-40" />
              </div>
            )}
            <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {product.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-kobicha to-walnut-brown p-6 rounded-xl border border-blue-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-white" />
                  <p className="text-sm font-semibold text-white">Price</p>
                </div>
                <p className="text-3xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-battleship-gray to-sepia p-6 rounded-xl border border-purple-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-6 h-6 text-white" />
                  <p className="text-sm font-semibold text-white">
                    Stock Available
                  </p>
                </div>
                <p className="text-3xl font-bold text-white">{product.stock}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl border border-cadet-gray"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Tag className="w-6 h-6 text-black" />
                  <p className="text-sm font-semibold text-black">Category</p>
                </div>
                <p className="text-2xl font-bold text-black">
                  {product.category}
                </p>
              </motion.div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Price Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-kobicha to-walnut-brown p-6 shadow-lg border border-blue-200"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-white/90" />
                    <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                      Price
                    </p>
                  </div>
                  <span className="text-xs text-white/60 font-medium">USD</span>
                </div>
                <p className="text-4xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </p>
              </motion.div>

              {/* Stock Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-battleship-gray to-sepia p-6 shadow-lg border border-purple-200"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 pointer-events-none" />
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-6 h-6 text-white/90" />
                    <p className="text-sm font-medium text-white/80 uppercase tracking-wide">
                      Stock
                    </p>
                  </div>
                  <span className="text-xs text-white/60 font-medium">
                    Available
                  </span>
                </div>
                <p className="text-4xl font-bold text-white">{product.stock}</p>
              </motion.div>

              {/* Category Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md border border-cadet-gray"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-transparent opacity-60 pointer-events-none" />
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-6 h-6 text-black/80" />
                    <p className="text-sm font-medium text-black/60 uppercase tracking-wide">
                      Category
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-semibold text-black">
                  {product.category}
                </p>
              </motion.div>
            </div>

            {/* Metadata */}
            {product.createdAt ? (
              <div className="border-t border-gray-200 pt-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(product.createdAt).toLocaleDateString("en-US")}
                </div>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/products/edit/${product.id}`)}
                className="flex-1 bg-gradient-to-r from-walnut-brown to-kobicha text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit2 className="w-5 h-5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-50 text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-200 cursor-pointer"
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
          loading={deleteMutation.isPending}
          productName={product.name}
        />
      )}
    </div>
  );
}
