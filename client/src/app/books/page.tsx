"use client";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../lib/api";
import { Book } from "../../types/book";
import BookCard from "../../components/BookCard";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <main className="p-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">
          No books available.
        </p>
      ) : (
        books.map((book) => <BookCard key={book.bookId} book={book} />)
      )}
    </main>
  );
}
