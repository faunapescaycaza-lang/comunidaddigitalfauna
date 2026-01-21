"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal = ({ onClose, onLoginSuccess }: LoginModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      onLoginSuccess();
      onClose();
      router.refresh(); // Refresh to update server component state (e.g., admin status)
    } else {
      const data = await res.json();
      setError(data.message || "Error al iniciar sesión.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-white/90">Iniciar Sesión Admin</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-white/5 py-3 px-4 text-white/90 transition-colors focus:border-white/30 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-gray-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
