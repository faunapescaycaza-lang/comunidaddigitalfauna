"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ReportForm } from "./ReportForm";
import { PlusCircle, XCircle } from "lucide-react";

export const FormToggler = ({ isAdmin }: { isAdmin: boolean }) => {
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Abrir el formulario automáticamente si viene el parámetro openForm
    if (searchParams.get("openForm") === "true") {
      setShowForm(true);
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-purple-400/30 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
        >
          {showForm ? (
            <>
              <XCircle size={24} />
              Cerrar Formulario
            </>
          ) : (
            <>
              <PlusCircle size={24} />
              Registrar Guardián de Fauna
            </>
          )}
        </button>
      </div>

      {showForm && (
        <>
          <ReportForm />
          <div className="w-full border-t border-white/10 mt-8" />
        </>
      )}
    </>
  );
};
