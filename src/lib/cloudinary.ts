import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Una sola configuración clara y directa.
if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
  console.log("Cloudinary configured successfully.");
} else {
  console.error("Cloudinary configuration failed. Missing required environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).");
}

// Exportar cloudinary configurado
export { cloudinary };

// Función para subir un archivo a Cloudinary
export async function uploadImageToCloudinary(file: File) {
  // Verificación robusta al inicio de la función
  if (!cloudinary.config().api_key || !cloudinary.config().api_secret || !cloudinary.config().cloud_name) {
    throw new Error("Cloudinary credentials are not configured. Please check your environment variables.");
  }

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
