import { headers } from "next/headers"; // Import headers
import { AdminContextWrapper } from "../components/AdminContextWrapper";
import { Feed } from "../components/Feed"; // Import Feed
import Image from "next/image";

export default async function Home() {
  const cookieHeader = (await headers()).get("Cookie");
  let isAdmin = false;

  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const isAdminCookie = cookies.find(cookie => cookie.startsWith("isAdmin="));
    if (isAdminCookie) {
      isAdmin = isAdminCookie.split('=')[1] === "true";
    }
  }

  return (
    <AdminContextWrapper isAdmin={isAdmin}>
      <Feed isAdmin={isAdmin} />
      <div className="relative mt-16 p-4 border border-gray-700 rounded-lg">
        <Image
          src="/Historieta definitiva.jpeg"
          alt="Historieta"
          width={1920}
          height={1080}
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-transparent rounded-lg"></div>
      </div>
    </AdminContextWrapper>
  );
}

