import axiosInstance from "./axiosInstance";
import { Book } from "../types/book";

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await axiosInstance.get("/books");
  return res.data as Book[];
};

export const loginUser = async (email: string, password: string) => {
  const res = await axiosInstance.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};
