// "use client";

// import React, { useState } from "react";
// import {
//   Search,
//   Plus,
//   Edit2,
//   Trash2,
//   Eye,
//   LogOut,
//   ShoppingBag,
//   X,
//   Check,
//   AlertCircle,
// } from "lucide-react";

// const ProductManagementDemo = () => {
//   const [currentView, setCurrentView] = useState("login");
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Wireless Headphones",
//       category: "Electronics",
//       price: 79.99,
//       description: "Premium sound quality",
//       stock: 45,
//     },
//     {
//       id: 2,
//       name: "Yoga Mat",
//       category: "Fitness",
//       price: 29.99,
//       description: "Non-slip surface",
//       stock: 120,
//     },
//     {
//       id: 3,
//       name: "Coffee Maker",
//       category: "Home",
//       price: 89.99,
//       description: "Programmable brewing",
//       stock: 30,
//     },
//     {
//       id: 4,
//       name: "Running Shoes",
//       category: "Fitness",
//       price: 119.99,
//       description: "Lightweight design",
//       stock: 67,
//     },
//     {
//       id: 5,
//       name: "Desk Lamp",
//       category: "Home",
//       price: 39.99,
//       description: "Adjustable brightness",
//       stock: 88,
//     },
//     {
//       id: 6,
//       name: "Bluetooth Speaker",
//       category: "Electronics",
//       price: 59.99,
//       description: "Waterproof design",
//       stock: 52,
//     },
//   ]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     price: "",
//     description: "",
//     stock: "",
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const categories = ["all", "Electronics", "Fitness", "Home"];

//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "all" || p.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const validateForm = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = "Product name is required";
//     if (!formData.category) errors.category = "Category is required";
//     if (!formData.price || parseFloat(formData.price) <= 0)
//       errors.price = "Price must be greater than 0";
//     if (!formData.stock || parseInt(formData.stock) < 0)
//       errors.stock = "Stock must be 0 or greater";
//     if (!formData.description.trim())
//       errors.description = "Description is required";
//     return errors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const errors = validateForm();
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
//     setIsLoading(true);
//     setTimeout(() => {
//       if (selectedProduct) {
//         setProducts(
//           products.map((p) =>
//             p.id === selectedProduct.id
//               ? {
//                   ...formData,
//                   id: p.id,
//                   price: parseFloat(formData.price),
//                   stock: parseInt(formData.stock),
//                 }
//               : p
//           )
//         );
//       } else {
//         setProducts([
//           ...products,
//           {
//             ...formData,
//             id: Date.now(),
//             price: parseFloat(formData.price),
//             stock: parseInt(formData.stock),
//           },
//         ]);
//       }
//       setCurrentView("products");
//       setFormData({
//         name: "",
//         category: "",
//         price: "",
//         description: "",
//         stock: "",
//       });
//       setFormErrors({});
//       setIsLoading(false);
//     }, 500);
//   };

//   const handleDelete = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setProducts(products.filter((p) => p.id !== productToDelete.id));
//       setShowDeleteModal(false);
//       setProductToDelete(null);
//       setIsLoading(false);
//       if (currentView === "details") setCurrentView("products");
//     }, 300);
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setFormData({
//       name: product.name,
//       category: product.category,
//       price: product.price.toString(),
//       description: product.description,
//       stock: product.stock.toString(),
//     });
//     setCurrentView("form");
//   };

//   const handleCreate = () => {
//     setSelectedProduct(null);
//     setFormData({
//       name: "",
//       category: "",
//       price: "",
//       description: "",
//       stock: "",
//     });
//     setFormErrors({});
//     setCurrentView("form");
//   };

//   // Login View
//   if (currentView === "login") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
//           <div className="flex justify-center mb-6">
//             <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl">
//               <ShoppingBag className="w-8 h-8 text-white" />
//             </div>
//           </div>
//           <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             Welcome Back
//           </h1>
//           <p className="text-gray-600 text-center mb-8">
//             Sign in to manage your products
//           </p>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               setCurrentView("products");
//             }}
//           >
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 required
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 placeholder="you@example.com"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
//             >
//               Sign In
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // Products List View
//   if (currentView === "products") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <div className="flex items-center space-x-3">
//                 <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
//                   <ShoppingBag className="w-6 h-6 text-white" />
//                 </div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   ProductHub
//                 </h1>
//               </div>
//               <button
//                 onClick={() => setCurrentView("login")}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span className="hidden sm:inline">Logout</span>
//               </button>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Products</h2>
//             <p className="text-gray-600">Manage your product inventory</p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
//             <div className="flex flex-col sm:flex-row gap-4 mb-4">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 />
//               </div>
//               <button
//                 onClick={handleCreate}
//                 className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
//               >
//                 <Plus className="w-5 h-5" />
//                 <span>Add Product</span>
//               </button>
//             </div>

//             <div className="flex gap-2 overflow-x-auto pb-2">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
//                     selectedCategory === cat
//                       ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   }`}
//                 >
//                   {cat === "all" ? "All Products" : cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
//               >
//                 <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-32 relative">
//                   <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
//                     {product.category}
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     {product.name}
//                   </h3>
//                   <p className="text-gray-600 text-sm mb-4">
//                     {product.description}
//                   </p>
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-2xl font-bold text-indigo-600">
//                       ${product.price}
//                     </span>
//                     <span className="text-sm text-gray-500">
//                       Stock: {product.stock}
//                     </span>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => {
//                         setSelectedProduct(product);
//                         setCurrentView("details");
//                       }}
//                       className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
//                     >
//                       <Eye className="w-4 h-4" />
//                       <span>View</span>
//                     </button>
//                     <button
//                       onClick={() => handleEdit(product)}
//                       className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1"
//                     >
//                       <Edit2 className="w-4 h-4" />
//                       <span>Edit</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         setProductToDelete(product);
//                         setShowDeleteModal(true);
//                       }}
//                       className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filteredProducts.length === 0 && (
//             <div className="text-center py-16">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                 <Search className="w-8 h-8 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No products found
//               </h3>
//               <p className="text-gray-600">
//                 Try adjusting your search or filters
//               </p>
//             </div>
//           )}
//         </div>

//         {showDeleteModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
//               <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4 mx-auto">
//                 <AlertCircle className="w-6 h-6 text-red-600" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
//                 Delete Product
//               </h3>
//               <p className="text-gray-600 mb-6 text-center">
//                 Are you sure you want to delete "{productToDelete?.name}"? This
//                 action cannot be undone.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setProductToDelete(null);
//                   }}
//                   disabled={isLoading}
//                   className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={isLoading}
//                   className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
//                 >
//                   {isLoading ? "Deleting..." : "Delete"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Product Details View
//   if (currentView === "details" && selectedProduct) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <nav className="bg-white border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <button
//                 onClick={() => setCurrentView("products")}
//                 className="text-indigo-600 hover:text-indigo-700 font-semibold"
//               >
//                 ← Back to Products
//               </button>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//             <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-64 relative flex items-center justify-center">
//               <div className="text-white">
//                 <ShoppingBag className="w-24 h-24 opacity-50" />
//               </div>
//               <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full text-sm font-bold text-gray-700">
//                 {selectedProduct.category}
//               </div>
//             </div>

//             <div className="p-8">
//               <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                 {selectedProduct.name}
//               </h1>
//               <p className="text-gray-600 text-lg mb-8">
//                 {selectedProduct.description}
//               </p>

//               <div className="grid grid-cols-2 gap-6 mb-8">
//                 <div className="bg-indigo-50 p-6 rounded-xl">
//                   <p className="text-sm text-indigo-600 font-semibold mb-1">
//                     Price
//                   </p>
//                   <p className="text-3xl font-bold text-indigo-700">
//                     ${selectedProduct.price}
//                   </p>
//                 </div>
//                 <div className="bg-purple-50 p-6 rounded-xl">
//                   <p className="text-sm text-purple-600 font-semibold mb-1">
//                     Stock Available
//                   </p>
//                   <p className="text-3xl font-bold text-purple-700">
//                     {selectedProduct.stock}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => handleEdit(selectedProduct)}
//                   className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
//                 >
//                   <Edit2 className="w-5 h-5" />
//                   <span>Edit Product</span>
//                 </button>
//                 <button
//                   onClick={() => {
//                     setProductToDelete(selectedProduct);
//                     setShowDeleteModal(true);
//                   }}
//                   className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                   <span>Delete</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {showDeleteModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
//               <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4 mx-auto">
//                 <AlertCircle className="w-6 h-6 text-red-600" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
//                 Delete Product
//               </h3>
//               <p className="text-gray-600 mb-6 text-center">
//                 Are you sure you want to delete "{productToDelete?.name}"? This
//                 action cannot be undone.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => {
//                     setShowDeleteModal(false);
//                     setProductToDelete(null);
//                   }}
//                   className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={isLoading}
//                   className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
//                 >
//                   {isLoading ? "Deleting..." : "Delete"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // Create/Edit Form View
//   if (currentView === "form") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//         <nav className="bg-white border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-16">
//               <button
//                 onClick={() => {
//                   setCurrentView("products");
//                   setFormErrors({});
//                 }}
//                 className="text-indigo-600 hover:text-indigo-700 font-semibold"
//               >
//                 ← Cancel
//               </button>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               {selectedProduct ? "Edit Product" : "Create New Product"}
//             </h2>
//             <p className="text-gray-600 mb-8">
//               Fill in the product details below
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => {
//                     setFormData({ ...formData, name: e.target.value });
//                     setFormErrors({ ...formErrors, name: "" });
//                   }}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                     formErrors.name ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter product name"
//                 />
//                 {formErrors.name && (
//                   <p className="mt-2 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {formErrors.name}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   value={formData.category}
//                   onChange={(e) => {
//                     setFormData({ ...formData, category: e.target.value });
//                     setFormErrors({ ...formErrors, category: "" });
//                   }}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                     formErrors.category ? "border-red-500" : "border-gray-300"
//                   }`}
//                 >
//                   <option value="">Select a category</option>
//                   {categories
//                     .filter((c) => c !== "all")
//                     .map((cat) => (
//                       <option key={cat} value={cat}>
//                         {cat}
//                       </option>
//                     ))}
//                 </select>
//                 {formErrors.category && (
//                   <p className="mt-2 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {formErrors.category}
//                   </p>
//                 )}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Price ($) *
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={formData.price}
//                     onChange={(e) => {
//                       setFormData({ ...formData, price: e.target.value });
//                       setFormErrors({ ...formErrors, price: "" });
//                     }}
//                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                       formErrors.price ? "border-red-500" : "border-gray-300"
//                     }`}
//                     placeholder="0.00"
//                   />
//                   {formErrors.price && (
//                     <p className="mt-2 text-sm text-red-600 flex items-center">
//                       <AlertCircle className="w-4 h-4 mr-1" />
//                       {formErrors.price}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Stock *
//                   </label>
//                   <input
//                     type="number"
//                     value={formData.stock}
//                     onChange={(e) => {
//                       setFormData({ ...formData, stock: e.target.value });
//                       setFormErrors({ ...formErrors, stock: "" });
//                     }}
//                     className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                       formErrors.stock ? "border-red-500" : "border-gray-300"
//                     }`}
//                     placeholder="0"
//                   />
//                   {formErrors.stock && (
//                     <p className="mt-2 text-sm text-red-600 flex items-center">
//                       <AlertCircle className="w-4 h-4 mr-1" />
//                       {formErrors.stock}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => {
//                     setFormData({ ...formData, description: e.target.value });
//                     setFormErrors({ ...formErrors, description: "" });
//                   }}
//                   rows={4}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none ${
//                     formErrors.description
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   }`}
//                   placeholder="Enter product description"
//                 />
//                 {formErrors.description && (
//                   <p className="mt-2 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {formErrors.description}
//                   </p>
//                 )}
//               </div>

//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setCurrentView("products");
//                     setFormErrors({});
//                   }}
//                   className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
//                 >
//                   {isLoading ? (
//                     <span>Saving...</span>
//                   ) : (
//                     <>
//                       <Check className="w-5 h-5" />
//                       <span>
//                         {selectedProduct ? "Update Product" : "Create Product"}
//                       </span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default ProductManagementDemo;
