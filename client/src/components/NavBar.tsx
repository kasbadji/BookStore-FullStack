"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function NavBar() {
  const { user, token, loading, setToken, loadUser, logout, init } = useAuthStore();

  useEffect(() => {
    // run initialization on client mount to read token and load user
    if (typeof window === 'undefined') return;
    if (typeof init === 'function') {
      init();
      return;
    }

    // fallback behavior if init is not available
    const savedToken = window.localStorage.getItem('token');
    if (savedToken && !token) {
      setToken(savedToken);
      if (typeof loadUser === 'function') loadUser();
    }
  }, [init, token, setToken, loadUser]);

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
            <span>Hello, {user?.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
