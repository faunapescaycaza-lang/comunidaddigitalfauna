import { NextResponse } from "next/server";
// import { cookies } from "next/headers"; // No longer needed

export async function POST() {
  const response = NextResponse.json({ message: "Logout successful" });
  const cookieValue = "isAdmin=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax" + (process.env.NODE_ENV === "production" ? "; Secure" : "");
  console.log("Setting logout cookie:", cookieValue); // Debug log
  response.headers.set("Set-Cookie", cookieValue);
  return response;
}
