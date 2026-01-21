import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fauna Comunidad Digital",
  description: "Una plataforma para compartir avistamientos de fauna.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased bg-gray-950 text-white`}
      >
        <Image
          src="/nina-guardian.png"
          alt="Silueta"
          width={80}
          height={120}
          priority
          className="fixed right-4 top-32 z-10 w-20 h-auto"
        />
        {children}
      </body>
    </html>
  );
}
