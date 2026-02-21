"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la home con el parámetro para abrir el formulario
    router.replace("/?openForm=true");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="text-center">
        <div className="mb-4 text-6xl">🌿</div>
        <p className="text-xl text-white">Cargando formulario de registro...</p>
      </div>
    </div>
  );
}
