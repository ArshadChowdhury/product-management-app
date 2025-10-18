"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { useProducts, useDeleteProduct } from "../../hooks/useProducts";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  LogOut,
  ShoppingBag,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import DeleteModal from "../../components/DeleteModal";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../../types/product";
import Image from "next/image";

const CATEGORIES = [
  "all",
  "Electronics",
  "Fitness",
  "Home",
  "Fashion",
  "Books",
  "Food",
  "Other",
];
const ITEMS_PER_PAGE = 3;

export default function ProductsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Fetch products directly from API
  const { data, isLoading, isFetching, error, refetch } = useProducts({
    page: currentPage,
    search: debouncedSearch || undefined,
    category: selectedCategory !== "all" ? selectedCategory : undefined,
  });

  const deleteMutation = useDeleteProduct();

  // ✅ Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    await deleteMutation.mutateAsync(productToDelete.id);
    setShowDeleteModal(false);
    setProductToDelete(null);
    refetch();
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const products = data?.data || [];
  const totalPages = Math.ceil((data?.count || 0) / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-walnut-brown to-kobicha p-2 rounded-xl shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-walnut-brown to-kobicha bg-clip-text text-transparent">
                Product Catalog
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Products</h2>
          <p className="text-gray-600 text-lg">Manage your product inventory</p>
        </motion.div>

        {/* Search + Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:outline-none rounded-xl transition-all"
              />
            </div>

            <button
              onClick={() => router.push("/products/create")}
              className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Category Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-walnut-brown to-kobicha text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat === "all" ? "All Products" : cat}
              </motion.button>
            ))}
          </div>

          {/* Result Count */}
          {!isLoading && (
            <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
              Showing {products.length} of {data?.count ?? 0} products
              {isFetching && (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              )}
            </div>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-600">
                {(error as any).message || "Failed to load products"}
              </p>
              <button
                onClick={() => refetch()}
                className="text-sm text-red-700 underline mt-1 hover:text-red-800"
              >
                Try again
              </button>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : products.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            >
              <AnimatePresence mode="popLayout">
                {products.map((product: Product, index: number) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="bg-gradient-to-br from-kobicha to-walnut-brown h-52 relative">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          fill
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ShoppingBag className="w-16 h-16 text-white opacity-40" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-md">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-sepia">
                          ${product.price.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            product.stock >= 20
                              ? "bg-green-100 text-green-700"
                              : product.stock >= 10
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.stock} in stock
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => router.push(`/products/${product.id}`)}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/products/edit/${product.id}`)
                          }
                          className="flex-1 bg-walnut-brown text-white py-2 rounded-lg font-medium hover:bg-kobicha transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete({
                              id: product.id,
                              name: product.name,
                            });
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Server Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-lg font-medium transition-all ${
                        page === currentPage
                          ? "bg-gradient-to-r from-walnut-brown to-kobicha text-white shadow-md cursor-not-allowed"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first product"}
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <button
                onClick={() => router.push("/products/create")}
                className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Product</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && productToDelete && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setProductToDelete(null);
          }}
          onConfirm={handleDelete}
          loading={deleteMutation.isPending}
          productName={productToDelete.name}
        />
      )}
    </div>
  );
}
