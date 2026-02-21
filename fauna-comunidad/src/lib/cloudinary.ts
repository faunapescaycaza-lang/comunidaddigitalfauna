import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para subir un archivo a Cloudinary
export async function uploadImageToCloudinary(file: File) {
  const fileBuffer = await file.arrayBuffer();
  const mime = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  const result = await cloudinary.uploader.upload(fileUri, {
    folder: "fauna-comunidad",
  });

  return result.secure_url;
}
