// import React from "react";

// const page = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <nav className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <button
//               onClick={() => {
//                 setCurrentView("products");
//                 setFormErrors({});
//               }}
//               className="text-indigo-600 hover:text-indigo-700 font-semibold"
//             >
//               ← Cancel
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             {selectedProduct ? "Edit Product" : "Create New Product"}
//           </h2>
//           <p className="text-gray-600 mb-8">
//             Fill in the product details below
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => {
//                   setFormData({ ...formData, name: e.target.value });
//                   setFormErrors({ ...formErrors, name: "" });
//                 }}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                   formErrors.name ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter product name"
//               />
//               {formErrors.name && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {formErrors.name}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => {
//                   setFormData({ ...formData, category: e.target.value });
//                   setFormErrors({ ...formErrors, category: "" });
//                 }}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                   formErrors.category ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <option value="">Select a category</option>
//                 {categories
//                   .filter((c) => c !== "all")
//                   .map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//               </select>
//               {formErrors.category && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {formErrors.category}
//                 </p>
//               )}
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Price ($) *
//                 </label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) => {
//                     setFormData({ ...formData, price: e.target.value });
//                     setFormErrors({ ...formErrors, price: "" });
//                   }}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                     formErrors.price ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="0.00"
//                 />
//                 {formErrors.price && (
//                   <p className="mt-2 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {formErrors.price}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Stock *
//                 </label>
//                 <input
//                   type="number"
//                   value={formData.stock}
//                   onChange={(e) => {
//                     setFormData({ ...formData, stock: e.target.value });
//                     setFormErrors({ ...formErrors, stock: "" });
//                   }}
//                   className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
//                     formErrors.stock ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="0"
//                 />
//                 {formErrors.stock && (
//                   <p className="mt-2 text-sm text-red-600 flex items-center">
//                     <AlertCircle className="w-4 h-4 mr-1" />
//                     {formErrors.stock}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => {
//                   setFormData({ ...formData, description: e.target.value });
//                   setFormErrors({ ...formErrors, description: "" });
//                 }}
//                 rows={4}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none ${
//                   formErrors.description ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter product description"
//               />
//               {formErrors.description && (
//                 <p className="mt-2 text-sm text-red-600 flex items-center">
//                   <AlertCircle className="w-4 h-4 mr-1" />
//                   {formErrors.description}
//                 </p>
//               )}
//             </div>

//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setCurrentView("products");
//                   setFormErrors({});
//                 }}
//                 className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
//               >
//                 {isLoading ? (
//                   <span>Saving...</span>
//                 ) : (
//                   <>
//                     <Check className="w-5 h-5" />
//                     <span>
//                       {selectedProduct ? "Update Product" : "Create Product"}
//                     </span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
