"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>

        <Link
          href="/"
          className="px-5 py-3 rounded-xl bg-kobicha text-white hover:bg-sepia transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
