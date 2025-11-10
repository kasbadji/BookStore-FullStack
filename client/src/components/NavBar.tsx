"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <Link href="/" className="text-xl font-bold">
        BookStore
      </Link>
      <div className="flex gap-4">
        <Link href="/books">Books</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/auth/login">Login</Link>
      </div>
    </nav>
  );
}
