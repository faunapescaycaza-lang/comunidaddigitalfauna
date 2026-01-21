import { NextResponse } from "next/server";
import { headers } from "next/headers"; // Use headers for manual cookie parsing

export async function GET(request: Request) {
  const cookieHeader = headers().get("Cookie");
  let isAdmin = false;

  console.log("Auth Status - Cookie Header:", cookieHeader); // Debug log

  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const isAdminCookie = cookies.find(cookie => cookie.startsWith("isAdmin="));
    if (isAdminCookie) {
      isAdmin = isAdminCookie.split('=')[1] === "true";
    }
  }
  console.log("Auth Status - isAdmin:", isAdmin); // Debug log
  return NextResponse.json({ isAdmin });
}
