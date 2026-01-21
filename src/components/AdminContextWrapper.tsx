"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormToggler } from "@/components/FormToggler";
// import { Feed } from "@/components/Feed"; // Feed is now passed as children
import { Navbar } from "@/components/Navbar";

interface AdminContextWrapperProps {
  isAdmin: boolean;
  children: React.ReactNode;
}

export function AdminContextWrapper({ isAdmin: initialIsAdmin, children }: AdminContextWrapperProps) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const router = useRouter();

  // We no longer fetch auth status here, as it's passed from the server
  // This useEffect is mainly for router.refresh() after login/logout,
  // and to ensure client-side state is in sync if server-side rendered initialIsAdmin changes.
  useEffect(() => {
    setIsAdmin(initialIsAdmin);
  }, [initialIsAdmin]);

  return (
    <>
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-16">
          <FormToggler isAdmin={isAdmin} />
          {children} {/* Render Feed here */}
        </div>
      </main>
    </>
  );
}
