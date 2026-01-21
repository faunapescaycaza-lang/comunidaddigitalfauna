"use client";

import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Camera, Calendar, User, Mail, AlertCircle, MapPin } from "lucide-react"; // Import MapPin
import { createReport, type FormState } from "../app/actions";
import { SubmitButton } from "./SubmitButton";

const MAX_IMAGES = 5;
const MIN_IMAGES = 1;

const initialState: FormState = {
  message: "",
  errors: {},
  success: false,
};

export const ReportForm = () => {
  const [formState, formAction] = useFormState(createReport, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (formState.success) {
      // Limpiar formulario después de éxito
      formRef.current?.reset();
      setSelectedFile(null);
      setUploadedImageUrl(null);
      setUploadError(null);
    }
  }, [formState]);

  useEffect(() => {
    if (selectedFile) {
      setIsUploading(true);
      setUploadError(null);
      const uploadFile = async () => {
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Fallo la subida de imagen");
          }

          const data = await response.json();
          setUploadedImageUrl(data.imageUrl);
        } catch (error: any) {
          setUploadError(error.message);
          setUploadedImageUrl(null);
        } finally {
          setIsUploading(false);
        }
      };
      uploadFile();
    }
  }, [selectedFile]);

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
      <h2 className="mb-6 text-2xl font-bold text-white/90">
        Guardianes de Fauna Silvestre
      </h2>
      <form ref={formRef} action={formAction} className="space-y-6">
        <input type="hidden" name="imageUrl" value={uploadedImageUrl || ""} />
        {/* --- MENSAJES DE ESTADO --- */}
        {formState.message && !formState.success && (
          <div className="flex items-center gap-2 rounded-md bg-red-900/50 p-3 text-sm text-red-300">
            <AlertCircle size={18} /> {formState.message}
          </div>
        )}
        {formState.success && (
            <div className="flex items-center gap-2 rounded-md bg-green-900/50 p-3 text-sm text-green-300">
                {formState.message}
            </div>
        )}
        {uploadError && (
          <div className="flex items-center gap-2 rounded-md bg-red-900/50 p-3 text-sm text-red-300">
            <AlertCircle size={18} /> {uploadError}
          </div>
        )}

        {/* --- DATOS PERSONALES --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input type="text" name="nombre" placeholder="Nombre" required className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white/90 transition-colors focus:border-white/30 focus:outline-none" />
            </div>
            {formState.errors?.nombre && <p className="mt-1 text-xs text-red-400">{formState.errors.nombre[0]}</p>}
          </div>
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input type="text" name="apellido" placeholder="Apellido" required className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white/90 transition-colors focus:border-white/30 focus:outline-none" />
            </div>
            {formState.errors?.apellido && <p className="mt-1 text-xs text-red-400">{formState.errors.apellido[0]}</p>}
          </div>
          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={20} /> {/* Changed to MapPin */}
              <input type="text" name="localidad" placeholder="Localidad de Residencia" required className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white/90 transition-colors focus:border-white/30 focus:outline-none" />
            </div>
            {formState.errors?.localidad && <p className="mt-1 text-xs text-red-400">{formState.errors.localidad[0]}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input type="email" name="email" placeholder="Email" required className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white/90 transition-colors focus:border-white/30 focus:outline-none" />
            </div>
            {formState.errors?.email && <p className="mt-1 text-xs text-red-400">{formState.errors.email[0]}</p>}
          </div>
          <div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              <input type="date" name="fecha" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full appearance-none rounded-md border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white/90 transition-colors focus:border-white/30 focus:outline-none" />
            </div>
            {formState.errors?.fecha && <p className="mt-1 text-xs text-red-400">{formState.errors.fecha[0]}</p>}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-white/80">Adjuntar o tomar foto (opcional)</h3>
          <div className="relative"> {/* Added relative positioning */}
            <Camera className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={20} /> {/* Camera icon added */}
            <input 
              type="file" 
              name="imageFile" // Changed name to imageFile
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
              className="w-full rounded-md border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white/90 transition-colors focus:border-white/30 focus:outline-none file:mr-4 file:py-3 file:px-4 file:rounded-l-md file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20"
            />
          </div>
          {isUploading && <p className="mt-1 text-xs text-blue-400">Subiendo imagen...</p>}
          {uploadedImageUrl && <p className="mt-1 text-xs text-green-400">Imagen subida.</p>}
          {formState.errors?.imageUrl && <p className="mt-1 text-xs text-red-400">{formState.errors.imageUrl[0]}</p>}
        </div>

        {/* --- BOTÓN DE ENVÍO --- */}
        <SubmitButton disabled={isUploading} /> {/* Disable button during upload */}
      </form>
    </section>
  );
};
