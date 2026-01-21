import { db } from "@/lib/db";
import { ReportCard } from "./ReportCard";

export const Feed = async ({ isAdmin }: { isAdmin: boolean }) => { // Accept isAdmin as prop
  const reportesData = await db
    .selectFrom("Reporte")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();

  const reports = await Promise.all(
    reportesData.map(async (reporte) => {
      const imagenes = await db
        .selectFrom("Imagen")
        .selectAll()
        .where("reporteId", "=", reporte.id)
        .execute();
      return { ...reporte, imagenes };
    })
  );

  if (reports.length === 0) {
    return (
      <div className="mt-16 rounded-lg border border-dashed border-white/20 bg-white/5 p-12 text-center text-white/60">
        <h3 className="text-lg font-semibold text-white/80">Aún no hay avistamientos</h3>
        <p className="mt-2 text-sm">
          Sé el primero en registrar uno usando el formulario de arriba.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h2 className="mb-8 text-3xl font-bold tracking-tight text-white/90">
        Últimos Avistamientos
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reports.map((report, index) => (
          <ReportCard key={report.id} report={report} index={index + 1} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
};
