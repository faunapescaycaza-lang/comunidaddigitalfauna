"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white transition-all hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:bg-indigo-800 disabled:opacity-70"
    >
      {pending ? "Registrando..." : "Se Guardian de Fauna"}
    </button>
  );
}
