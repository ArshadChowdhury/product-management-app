"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  LogOut,
  ShoppingBag,
  X,
  Check,
  AlertCircle,
} from "lucide-react";

const ProductManagementDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to manage your products
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // setCurrentView("products");
          }}
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default ProductManagementDemo;
