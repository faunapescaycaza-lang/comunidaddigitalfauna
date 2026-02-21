"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component
import { LoginModal } from "./LoginModal";

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const Navbar = ({ isAdmin, setIsAdmin }: NavbarProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLoginModal(false);
    router.refresh(); // Refresh to update server component state
  };

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      setIsAdmin(false);
      router.refresh(); // Refresh to update server component state
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-purple-400/20 bg-gray-900/80 backdrop-blur-lg">
        <div className="flex h-24 w-full items-center justify-between p-4">
          <div>
            <span className="text-3xl font-bold tracking-tight text-white">Fauna Comunidad Digital</span>
            <span className="ml-3 text-2xl font-light text-purple-300 hidden sm:inline">: Guardianes de la Fauna Silvestre</span>
          </div>
          <div className="flex items-center space-x-4"> {/* Wrapper for button and image */}
            <Image
              src="/fauna-removebg-preview.png"
              alt="Icono Guarda Fauna"
              width={80} // Adjusted size
              height={80} // Adjusted size
              className="rounded-full"
            />
            {isAdmin ? (
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600/80 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-500/90 hover:scale-105"
              >
                Logout Admin
              </button>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="rounded-md bg-purple-600/80 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-500/90 hover:scale-105"
              >
                Login Admin
              </button>
            )}
          </div>
        </div>
      </header>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};
