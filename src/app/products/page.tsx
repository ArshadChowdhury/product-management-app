// "use client";

// import { useEffect, useState, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import {
//   fetchProducts,
//   deleteProduct,
//   setSearchTerm,
//   setSelectedCategory,
// } from "@/store/slices/productsSlice";
// import { logout } from "@/store/slices/authSlice";
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   Eye,
//   LogOut,
//   ShoppingBag,
//   Loader2,
//   AlertCircle,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import DeleteModal from "@/components/DeleteModal";
// import { motion, AnimatePresence } from "framer-motion";

// const CATEGORIES = [
//   "all",
//   "Electronics",
//   "Fitness",
//   "Home",
//   "Fashion",
//   "Books",
//   "Food",
//   "Other",
// ];
// const ITEMS_PER_PAGE = 3;

// export default function ProductsPage() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { products, count, loading, error, searchTerm, selectedCategory } =
//     useAppSelector((state) => state.products);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [productToDelete, setProductToDelete] = useState<{
//     id: string;
//     name: string;
//   } | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [localSearch, setLocalSearch] = useState("");

//   useEffect(() => {
//     dispatch(
//       fetchProducts({
//         page: currentPage,
//         search: searchTerm,
//         category: selectedCategory === "all" ? undefined : selectedCategory,
//       })
//     );
//   }, [dispatch, currentPage, searchTerm, selectedCategory]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, selectedCategory]);

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       dispatch(setSearchTerm(localSearch));
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [localSearch, dispatch]);

//   const handleCategoryChange = (category: string) => {
//     dispatch(setSelectedCategory(category));
//     setCurrentPage(1);
//   };

//   const handleDelete = async () => {
//     if (!productToDelete) return;

//     try {
//       await dispatch(deleteProduct(productToDelete.id)).unwrap();
//       toast.success("Product deleted successfully");
//       setShowDeleteModal(false);
//       setProductToDelete(null);
//     } catch (err) {
//       toast.error("Failed to delete product");
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push("/login");
//     toast.success("Logged out successfully");
//   };

//   const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-br from-walnut-brown to-kobicha p-2 rounded-xl shadow-lg">
//                 <ShoppingBag className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-walnut-brown to-kobicha bg-clip-text text-transparent">
//                 ProductHub
//               </h1>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
//             >
//               <LogOut className="w-5 h-5" />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h2 className="text-4xl font-bold text-gray-900 mb-2">Products</h2>
//           <p className="text-gray-600 text-lg">Manage your product inventory</p>
//         </motion.div>

//         {/* Search and Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
//         >
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search products by name..."
//                 value={localSearch}
//                 onChange={(e) => setLocalSearch(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl transition-all"
//               />
//             </div>
//             <button
//               onClick={() => router.push("/products/create")}
//               className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add Product</span>
//             </button>
//           </div>

//           {/* Category Filters */}
//           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//             {CATEGORIES.map((cat) => (
//               <motion.button
//                 key={cat}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleCategoryChange(cat)}
//                 className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
//                   selectedCategory === cat
//                     ? "bg-gradient-to-r from-walnut-brown to-kobicha text-white shadow-md"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {cat === "all" ? "All Products" : cat}
//               </motion.button>
//             ))}
//           </div>

//           {/* Results count */}
//           {!loading && (
//             <div className="mt-4 text-sm text-gray-600">
//               Showing {products.length} of {count} products
//             </div>
//           )}
//         </motion.div>

//         {/* Error State */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
//           >
//             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <p className="text-sm text-red-600">{error}</p>
//           </motion.div>
//         )}

//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
//           </div>
//         )}

//         {/* Products Grid */}
//         {!loading && (
//           <>
//             {products.length > 0 ? (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
//                 >
//                   <AnimatePresence>
//                     {products.map((product, index) => (
//                       <motion.div
//                         key={product.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ delay: index * 0.05 }}
//                         whileHover={{ y: -5 }}
//                         className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
//                       >
//                         <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32 relative">
//                           {product.imageUrl ? (
//                             <img
//                               src={product.imageUrl}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="flex items-center justify-center h-full">
//                               <ShoppingBag className="w-16 h-16 text-white opacity-40" />
//                             </div>
//                           )}
//                           <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-md">
//                             {product.category}
//                           </div>
//                         </div>
//                         <div className="p-6">
//                           <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
//                             {product.name}
//                           </h3>
//                           <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                             {product.description}
//                           </p>
//                           <div className="flex justify-between items-center mb-4">
//                             <span className="text-2xl font-bold text-blue-600">
//                               ${product.price.toFixed(2)}
//                             </span>
//                             <span
//                               className={`text-sm font-medium px-3 py-1 rounded-full ${
//                                 product.stock > 50
//                                   ? "bg-green-100 text-green-700"
//                                   : product.stock > 20
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-red-100 text-red-700"
//                               }`}
//                             >
//                               {product.stock} in stock
//                             </span>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() =>
//                                 router.push(`/products/${product.id}`)
//                               }
//                               className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
//                             >
//                               <Eye className="w-4 h-4" />
//                               <span>View</span>
//                             </button>
//                             <button
//                               onClick={() =>
//                                 router.push(`/products/edit/${product.id}`)
//                               }
//                               className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               <span>Edit</span>
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setProductToDelete({
//                                   id: product.id,
//                                   name: product.name,
//                                 });
//                                 setShowDeleteModal(true);
//                               }}
//                               className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </motion.div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="flex justify-center items-center gap-2 mt-8"
//                   >
//                     {/* Previous Button */}
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={currentPage === 1}
//                       className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50
//                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                       <span className="hidden sm:inline">Previous</span>
//                     </button>

//                     {/* Page Numbers */}
//                     <div className="flex gap-1">
//                       {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                         (page) => {
//                           const isActive = page === currentPage;
//                           return (
//                             <button
//                               key={page}
//                               onClick={() => setCurrentPage(page)}
//                               className={`w-9 h-9 rounded-lg font-medium transition-all ${
//                                 isActive
//                                   ? "bg-gradient-to-r from-walnut-brown to-kobicha text-white shadow-md"
//                                   : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
//                               }`}
//                             >
//                               {page}
//                             </button>
//                           );
//                         }
//                       )}
//                     </div>

//                     {/* Next Button */}
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50
//                  disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
//                     >
//                       <span className="hidden sm:inline">Next</span>
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </motion.div>
//                 )}
//               </>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="text-center py-20"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                   <Search className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {searchTerm || selectedCategory !== "all"
//                     ? "Try adjusting your search or filters"
//                     : "Get started by creating your first product"}
//                 </p>
//                 {!searchTerm && selectedCategory === "all" && (
//                   <button
//                     onClick={() => router.push("/products/create")}
//                     className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center space-x-2"
//                   >
//                     <Plus className="w-5 h-5" />
//                     <span>Create Product</span>
//                   </button>
//                 )}
//               </motion.div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Delete Modal */}
//       {showDeleteModal && productToDelete && (
//         <DeleteModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setProductToDelete(null);
//           }}
//           onConfirm={handleDelete}
//           loading={loading}
//           productName={productToDelete.name}
//         />
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/store/hooks";
// import { logout } from "@/store/slices/authSlice";
// import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   Eye,
//   LogOut,
//   ShoppingBag,
//   Loader2,
//   AlertCircle,
//   ChevronLeft,
//   ChevronRight,
//   RefreshCw,
// } from "lucide-react";
// import DeleteModal from "@/components/DeleteModal";
// import { motion, AnimatePresence } from "framer-motion";
// import { useQueryClient } from "@tanstack/react-query";
// import { productKeys } from "@/hooks/useProducts";

// const CATEGORIES = [
//   "all",
//   "Electronics",
//   "Fitness",
//   "Home",
//   "Fashion",
//   "Books",
//   "Food",
//   "Other",
// ];
// const ITEMS_PER_PAGE = 9;

// export default function ProductsPage() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const queryClient = useQueryClient();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [productToDelete, setProductToDelete] = useState<{
//     id: string;
//     name: string;
//   } | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch products with React Query
//   const { data, isLoading, error, refetch, isFetching } = useProducts({
//     search: searchTerm,
//     category: selectedCategory !== "all" ? selectedCategory : undefined,
//   });

//   // Delete mutation
//   const deleteMutation = useDeleteProduct();

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };

//   const handleDelete = async () => {
//     if (!productToDelete) return;

//     await deleteMutation.mutateAsync(productToDelete.id);
//     setShowDeleteModal(false);
//     setProductToDelete(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push("/login");
//   };

//   const handleRefresh = () => {
//     queryClient.invalidateQueries({ queryKey: productKeys.lists() });
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="text-center">
//           <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   const totalPages = Math.ceil(data?.count / ITEMS_PER_PAGE);

//   const products = data?.data;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-br from-walnut-brown to-kobicha p-2 rounded-xl shadow-lg">
//                 <ShoppingBag className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-xl font-bold bg-gradient-to-r from-walnut-brown to-kobicha bg-clip-text text-transparent">
//                 ProductHub
//               </h1>
//             </div>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleRefresh}
//                 disabled={isFetching}
//                 className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
//                 title="Refresh products"
//               >
//                 <RefreshCw
//                   className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
//                 />
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span className="hidden sm:inline font-medium">Logout</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8"
//         >
//           <h2 className="text-4xl font-bold text-gray-900 mb-2">Products</h2>
//           <p className="text-gray-600 text-lg">Manage your product inventory</p>
//         </motion.div>

//         {/* Search and Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8"
//         >
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search products by name..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl transition-all"
//               />
//             </div>
//             <button
//               onClick={() => router.push("/products/create")}
//               className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 whitespace-nowrap"
//             >
//               <Plus className="w-5 h-5" />
//               <span>Add Product</span>
//             </button>
//           </div>

//           {/* Category Filters */}
//           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//             {CATEGORIES.map((cat) => (
//               <motion.button
//                 key={cat}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleCategoryChange(cat)}
//                 className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
//                   selectedCategory === cat
//                     ? "bg-gradient-to-r from-walnut-brown to-kobicha text-white shadow-md"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {cat === "all" ? "All Products" : cat}
//               </motion.button>
//             ))}
//           </div>

//           {/* Results count */}
//           {!isLoading && (
//             <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
//               Showing {data?.data.length} of {data?.count} products
//               {isFetching && (
//                 <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
//               )}
//             </div>
//           )}
//         </motion.div>

//         {/* Error State */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
//           >
//             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <div className="flex-1">
//               <p className="text-sm text-red-600">
//                 {(error as any).message || "Failed to load products"}
//               </p>
//               <button
//                 onClick={() => refetch()}
//                 className="text-sm text-red-700 underline mt-1 hover:text-red-800"
//               >
//                 Try again
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {/* Products Grid */}
//         {!isLoading && (
//           <>
//             {products.length > 0 ? (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
//                 >
//                   <AnimatePresence mode="popLayout">
//                     {products.map((product, index) => (
//                       <motion.div
//                         key={product.id}
//                         layout
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ delay: index * 0.05 }}
//                         whileHover={{ y: -5 }}
//                         className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
//                       >
//                         <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32 relative">
//                           {product.imageUrl ? (
//                             <img
//                               src={product.imageUrl}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="flex items-center justify-center h-full">
//                               <ShoppingBag className="w-16 h-16 text-white opacity-40" />
//                             </div>
//                           )}
//                           <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-md">
//                             {product.category}
//                           </div>
//                         </div>
//                         <div className="p-6">
//                           <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
//                             {product.name}
//                           </h3>
//                           <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                             {product.description}
//                           </p>
//                           <div className="flex justify-between items-center mb-4">
//                             <span className="text-2xl font-bold text-blue-600">
//                               ${product.price.toFixed(2)}
//                             </span>
//                             <span
//                               className={`text-sm font-medium px-3 py-1 rounded-full ${
//                                 product.stock > 50
//                                   ? "bg-green-100 text-green-700"
//                                   : product.stock > 20
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-red-100 text-red-700"
//                               }`}
//                             >
//                               {product.stock} in stock
//                             </span>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() =>
//                                 router.push(`/products/${product.id}`)
//                               }
//                               className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
//                             >
//                               <Eye className="w-4 h-4" />
//                               <span>View</span>
//                             </button>
//                             <button
//                               onClick={() =>
//                                 router.push(`/products/edit/${product.id}`)
//                               }
//                               className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
//                             >
//                               <Edit2 className="w-4 h-4" />
//                               <span>Edit</span>
//                             </button>
//                             <button
//                               onClick={() => {
//                                 setProductToDelete({
//                                   id: product.id,
//                                   name: product.name,
//                                 });
//                                 setShowDeleteModal(true);
//                               }}
//                               className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </motion.div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="flex justify-center items-center gap-2"
//                   >
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={currentPage === 1}
//                       className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <ChevronLeft className="w-5 h-5" />
//                     </button>

//                     <div className="flex gap-2">
//                       {Array.from(
//                         { length: Math.min(totalPages, 7) },
//                         (_, i) => {
//                           let pageNum;
//                           if (totalPages <= 7) {
//                             pageNum = i + 1;
//                           } else if (currentPage <= 4) {
//                             pageNum = i + 1;
//                           } else if (currentPage >= totalPages - 3) {
//                             pageNum = totalPages - 6 + i;
//                           } else {
//                             pageNum = currentPage - 3 + i;
//                           }

//                           return (
//                             <button
//                               key={pageNum}
//                               onClick={() => setCurrentPage(pageNum)}
//                               className={`w-10 h-10 rounded-lg font-medium transition-all ${
//                                 currentPage === pageNum
//                                   ? "bg-gradient-to-r from-walnut-brown to-kobicha text-white shadow-md"
//                                   : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
//                               }`}
//                             >
//                               {pageNum}
//                             </button>
//                           );
//                         }
//                       )}
//                     </div>

//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                       <ChevronRight className="w-5 h-5" />
//                     </button>
//                   </motion.div>
//                 )}
//               </>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="text-center py-20"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                   <Search className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {searchTerm || selectedCategory !== "all"
//                     ? "Try adjusting your search or filters"
//                     : "Get started by creating your first product"}
//                 </p>
//                 {!searchTerm && selectedCategory === "all" && (
//                   <button
//                     onClick={() => router.push("/products/create")}
//                     className="bg-gradient-to-r from-walnut-brown to-kobicha text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center space-x-2"
//                   >
//                     <Plus className="w-5 h-5" />
//                     <span>Create Product</span>
//                   </button>
//                 )}
//               </motion.div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Delete Modal */}
//       {showDeleteModal && productToDelete && (
//         <DeleteModal
//           isOpen={showDeleteModal}
//           onClose={() => {
//             setShowDeleteModal(false);
//             setProductToDelete(null);
//           }}
//           onConfirm={handleDelete}
//           loading={deleteMutation.isPending}
//           productName={productToDelete.name}
//         />
//       )}
//     </div>
//   );
// }

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
    // limit: ITEMS_PER_PAGE,
  });

  const deleteMutation = useDeleteProduct();

  // // ✅ Debounce effect
  // useEffect(() => {
  //   const handler = setTimeout(() => setDebouncedSearch(searchTerm), 1500);
  //   return () => clearTimeout(handler);
  // }, [searchTerm]);

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
              {/* <button
                onClick={handleRefresh}
                disabled={isFetching}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                title="Refresh products"
              >
                <RefreshCw
                  className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`}
                />
              </button> */}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
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
                            product.stock > 50
                              ? "bg-green-100 text-green-700"
                              : product.stock > 20
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
