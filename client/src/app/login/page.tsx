"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
    const { login } = useAuthStore();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <form onSubmit={handleLogin} >
            <h2>Login</h2>

            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />

            <input placeholder="password" onChange={(e) => setPassword(e.target.value)} type="password" />

            <button type="submit" >Login</button>
        </form>
    );
}
