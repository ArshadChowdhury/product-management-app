import Link from "next/link";
import { PackageX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <PackageX className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Product Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The product you&apos;re looking for may have been removed or
        doesn&apos;t exist.
      </p>
      <Link
        href="/products"
        className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Browse Products
      </Link>
    </div>
  );
}
