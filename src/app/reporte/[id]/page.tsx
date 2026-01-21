import { db } from "../../../lib/db";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { notFound } from "next/navigation";
import { User, Calendar, MapPin, Camera } from "lucide-react";

export default async function ReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = await params;
  const report = await db
    .selectFrom("Reporte")
    .selectAll()
    .where("id", "=", unwrappedParams.id)
    .executeTakeFirst();

  if (!report) {
    notFound();
  }

  const imagenes = await db
    .selectFrom("Imagen")
    .selectAll()
    .where("reporteId", "=", report.id)
    .execute();

  const formattedDate = new Date(report.fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-16 mx-auto max-w-4xl rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
      <Link href="/" className="mb-4 inline-flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors">
        &larr; Volver
      </Link>
      <h1 className="mb-6 text-3xl font-bold text-white/90">
        {report.nombre} {report.apellido}
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Sección de Imágenes */}
        <div className="space-y-4">
          {imagenes.length > 0 ? (
            imagenes.map((img) => (
              <div key={img.id} className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={img.url}
                  alt={`Imagen de ${report.nombre} ${report.apellido}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <div className="flex aspect-video h-full items-center justify-center rounded-lg bg-gray-900">
              <Camera size={40} className="text-white/20" />
            </div>
          )}
        </div>

        {/* Sección de Información */}
        <div className="space-y-4 text-white/80">
          <p className="flex items-center gap-2">
            <User size={20} />
            <span className="font-semibold">
              {report.nombre} {report.apellido}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={20} />
            <span>{report.localidad}</span>
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={20} />
            <span>{formattedDate}</span>
          </p>
          <p className="text-white/60">
            Email de contacto: <span className="font-semibold">{report.email.split('-')[0]}</span>
          </p>
          <p className="mt-4 text-white/70 italic">
            Localidad: <span className="font-semibold">{report.localidad}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
