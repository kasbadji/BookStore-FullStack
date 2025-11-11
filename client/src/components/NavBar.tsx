"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function NavBar() {
  const { user, token, loading, setToken, loadUser, logout } = useAuthStore();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken && !token) {
      setToken(savedToken);
      loadUser();
    }
  }, [token, setToken, loadUser]);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 20px",
      borderBottom: "1px solid #ddd"
    }}>
      <Link href="/" style={{ fontWeight: "bold", fontSize: "20px" }}>
        BookStore
      </Link>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {/* Loading indicator */}
        {loading && <span>Loading...</span>}

        {/* No user = show Login/Register */}
        {!loading && !user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {/* User logged in */}
        {!loading && user && (
          <>
            <span>Hello, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
