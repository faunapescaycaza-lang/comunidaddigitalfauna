"use client";

import { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";
import { verifyFeedPassword } from "@/app/actions";

export const FeedLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await verifyFeedPassword(password);
            if (result.success) {
                window.location.reload(); // Refresh to show the feed
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Ocurrió un error al verificar la contraseña.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-16 flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-12 backdrop-blur-md">
            <div className="mb-4 rounded-full bg-white/10 p-4">
                <Lock className="text-white/60" size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white/90">Sección Protegida</h3>
            <p className="mb-8 text-center text-sm text-white/60 max-w-md">
                Para ver los registros de los guardianes y las fotografías, por favor ingresa la contraseña.
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <div className="relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Introduce la contraseña"
                        required
                        className="w-full rounded-md border border-white/10 bg-white/5 py-3 px-4 text-center text-white/90 transition-colors focus:border-white/30 focus:outline-none"
                    />
                </div>

                {error && (
                    <div className="flex items-center justify-center gap-2 text-sm text-red-400">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-white/10 py-3 font-semibold text-white/90 transition-all hover:bg-white/20 disabled:opacity-50"
                >
                    {isLoading ? "Verificando..." : "Acceder a sección"}
                </button>
            </form>
        </div>
    );
};
