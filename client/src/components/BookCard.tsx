"use client";
import Image from "next/image";
import { Book } from "../types/book";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <div className="border rounded-2xl shadow-md p-4 flex flex-col items-center gap-3 hover:shadow-lg transition">
      <Image
        src={book.bookImage}
        alt={book.bookTitle}
        width={160}
        height={220}
        className="object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold text-center">{book.bookTitle}</h2>
      <p className="text-sm text-gray-600 text-center line-clamp-2">
        {book.bookDescrpition}
      </p>
      <p className="font-bold">${book.bookPrice}</p>
      <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
}
