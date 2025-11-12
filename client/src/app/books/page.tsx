"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Book = {
  bookId: string;
  bookTitle: string;
  bookPrice: number;
  bookImage: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then((data: Book[]) => setBooks(data))
    .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Books</h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {books?.map((book) => (
          <div key={book.bookId} style={{ border: "1px solid #ddd", padding: "10px" }}>
            <Image src={book.bookImage} alt={book.bookTitle} width={180} height={240} />
            <h3>{book.bookTitle}</h3>
            <p>${book.bookPrice}</p>
            <Link href={`/books/${book.bookId}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
