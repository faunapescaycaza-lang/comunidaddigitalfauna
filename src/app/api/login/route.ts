import { NextResponse } from "next/server";
// import { cookies } from "next/headers"; // No longer needed

const ADMIN_PASSWORD = "a1s2d3f4"; // Hardcoded password

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ message: "Login successful" });
      const cookieValue = "isAdmin=true; Path=/; Max-Age=" + (60 * 60 * 24 * 7) + "; HttpOnly; SameSite=Lax" + (process.env.NODE_ENV === "production" ? "; Secure" : "");
      console.log("Setting cookie:", cookieValue); // Debug log
      response.headers.set("Set-Cookie", cookieValue);
      return response;
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    console.error("API Login Error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred", error: error.message },
      { status: 500 }
    );
  }
}
