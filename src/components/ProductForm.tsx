"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createProduct, updateProduct } from "@/store/slices/productsSlice";
import { productSchema, type ProductFormData } from "@/lib/validation/schemas";
import { Product } from "@/types/product";
import { AlertCircle, Loader2, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CATEGORIES = [
  "Electronics",
  "Fitness",
  "Home",
  "Fashion",
  "Books",
  "Food",
  "Other",
];

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.products);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category as any,
          imageUrl: product.imageUrl || "",
        }
      : {
          name: "",
          description: "",
          price: 0,
          stock: 0,
          category: "Electronics",
          imageUrl: "",
        },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (mode === "edit" && product) {
        await dispatch(updateProduct({ id: product.id, data })).unwrap();
        toast.success("Product updated successfully!");
        router.push(`/products/${product.id}`);
      } else {
        await dispatch(createProduct(data)).unwrap();
        toast.success("Product created successfully!");
        router.push("/products");
      }
    } catch (err: any) {
      toast.error(err || `Failed to ${mode} product`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {mode === "edit" ? "Edit Product" : "Create New Product"}
      </h2>
      <p className="text-gray-600 mb-8">
        {mode === "edit"
          ? "Update product information"
          : "Fill in the product details below"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.name.message}
            </motion.p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            {...register("category")}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.category.message}
            </motion.p>
          )}
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price")}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.price.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("stock")}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.stock ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0"
            />
            {errors.stock && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.stock.message}
              </motion.p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description")}
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product description (minimum 10 characters)"
          />
          {errors.description && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.description.message}
            </motion.p>
          )}
        </div>

        {/* Image URL (Optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image URL <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="url"
            {...register("imageUrl")}
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.imageUrl ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.imageUrl.message}
            </motion.p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading || isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {mode === "edit" ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                {mode === "edit" ? "Update Product" : "Create Product"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
