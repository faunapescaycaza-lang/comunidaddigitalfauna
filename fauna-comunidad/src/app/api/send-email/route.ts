import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getGuardianCardHtml } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
    }
    
    const emailHtml = getGuardianCardHtml(name);

    await resend.emails.send({
      from: 'faunanqn@permisos.geoarg.com',
      to: email,
      subject: '¡Gracias por ser un Guardián de Fauna!',
      html: emailHtml,
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("API Send Email Error:", error);
    // No devolver el objeto de error detallado al cliente por seguridad
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
