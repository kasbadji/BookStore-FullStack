"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
};

export default function BookDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get<{ book: Book }>(`/books/${id}`);
        setBook(res.data.book);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const deleteBook = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      router.push("/books");
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!book) return <p style={{ padding: 20 }}>Book not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>
      <p><b>Author:</b> {book.author}</p>
      <p><b>Price:</b> ${book.price}</p>
      <p style={{ marginTop: "10px" }}>{book.description}</p>

      {/* Admin/user actions */}
      {token && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button
            style={{
              padding: "8px 14px",
              background: "orange",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/books/${id}/edit`)}
          >
            Edit
          </button>

          <button
            style={{
              padding: "8px 14px",
              background: "red",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
            onClick={deleteBook}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
