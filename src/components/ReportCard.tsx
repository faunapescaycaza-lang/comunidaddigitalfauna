"use client";

import Image from "next/image";
import Link from "next/link";
import type { Reporte, Imagen } from "../lib/db-types";
import { User, Calendar, Edit, Trash2, Camera } from "lucide-react"; // Import Edit and Trash2 icons
import { deleteReport } from "../app/actions"; // Import the server action
import { useTransition } from "react";

// Extendemos el tipo Reporte para incluir las imágenes
type ReportWithImages = Reporte & {
  imagenes: Imagen[];
};

type ReportCardProps = {
  report: ReportWithImages;
  index: number;
  isAdmin: boolean; // New prop for admin status
};

export const ReportCard = ({ report, index, isAdmin }: ReportCardProps) => {
  const { nombre, apellido, fecha, localidad, imagenes } = report;
  const firstImage = imagenes[0];
  const extraImagesCount = imagenes.length - 1;
  const [isPending, startTransition] = useTransition();

  const formattedDate = new Date(fecha as unknown as Date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Detiene la navegación del Link
    if (window.confirm("¿Estás seguro de que quieres eliminar este reporte?")) {
      startTransition(async () => {
        const result = await deleteReport(report.id);
        if (result.success) {
          alert(result.message); // Usar alert en lugar de toast.success
        } else {
          alert(result.message); // Usar alert en lugar de toast.error
        }
      });
    }
  };

  return (
    <Link href={`/reporte/${report.id}`} className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/20">
      {/* IMAGEN PRINCIPAL */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
        {firstImage ? (
          <Image
            src={firstImage.url}
            alt={`Avistamiento de ${nombre} ${apellido}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-900">
            <Camera size={40} className="text-white/20" />
          </div>
        )}
        {extraImagesCount > 0 && (
          <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
            +{extraImagesCount}
          </div>
        )}
      </div>
      
      {/* INFORMACIÓN */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-white/60">
            <User size={16} />
            <span className="font-semibold text-white/80">#{index} {nombre} {apellido}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-white/60">
            <span>{localidad}</span>
        </div>
         <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
            <Calendar size={14} />
            <span>{formattedDate}</span>
        </div>
        {isAdmin && (
          <div className="mt-4 flex justify-end space-x-2">
            <button className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500 transition-colors">
              <Edit size={16} />
            </button>
            <button onClick={handleDelete} className="rounded-md bg-red-600 p-2 text-white hover:bg-red-500 transition-colors" disabled={isPending}>
              {isPending ? "Eliminando..." : <Trash2 size={16} />}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};