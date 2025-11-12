"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";

type Book = {
  bookId: string;
  bookTitle: string;
  bookPrice: number;
  bookDescription: string;
  bookImage: string;
  bookStock: number;
};

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.bookId) setBook(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  if (!book) return <h2 style={{ padding: "20px" }}>Book not found</h2>;

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Image src={book.bookImage} alt={book.bookTitle} width={300} height={450} />
      <h1>{book.bookTitle}</h1>
      <p><b>Price:</b> ${book.bookPrice}</p>
      <p>{book.bookDescription}</p>
      <p><b>Stock:</b> {book.bookStock}</p>
    </div>
  );
}
