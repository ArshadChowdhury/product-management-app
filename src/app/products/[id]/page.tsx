import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentView("products")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-64 relative flex items-center justify-center">
            <div className="text-white">
              <ShoppingBag className="w-24 h-24 opacity-50" />
            </div>
            <div className="absolute top-6 right-6 bg-white px-4 py-2 rounded-full text-sm font-bold text-gray-700">
              {selectedProduct.category}
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedProduct.name}
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              {selectedProduct.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-indigo-50 p-6 rounded-xl">
                <p className="text-sm text-indigo-600 font-semibold mb-1">
                  Price
                </p>
                <p className="text-3xl font-bold text-indigo-700">
                  ${selectedProduct.price}
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <p className="text-sm text-purple-600 font-semibold mb-1">
                  Stock Available
                </p>
                <p className="text-3xl font-bold text-purple-700">
                  {selectedProduct.stock}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(selectedProduct)}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <Edit2 className="w-5 h-5" />
                <span>Edit Product</span>
              </button>
              <button
                onClick={() => {
                  setProductToDelete(selectedProduct);
                  setShowDeleteModal(true);
                }}
                className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4 mx-auto">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete "{productToDelete?.name}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProductToDelete(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
