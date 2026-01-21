import { v2 as cloudinary } from "cloudinary";

// Parse CLOUDINARY_URL if available (Render format)
// Format: cloudinary://api_key:api_secret@cloud_name
let cloudName: string | undefined;
let apiKey: string | undefined;
let apiSecret: string | undefined;

const cloudinaryUrl = process.env.CLOUDINARY_URL;

if (cloudinaryUrl) {
  // Parse the Cloudinary URL
  try {
    const url = new URL(cloudinaryUrl);
    cloudName = url.hostname;
    apiKey = url.username;
    apiSecret = url.password;
    console.log("Cloudinary configured from CLOUDINARY_URL");
  } catch (error) {
    console.error("Error parsing CLOUDINARY_URL:", error);
  }
}

// Fallback to individual environment variables if CLOUDINARY_URL is not available
if (!cloudName || !apiKey || !apiSecret) {
  cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  apiKey = process.env.CLOUDINARY_API_KEY;
  apiSecret = process.env.CLOUDINARY_API_SECRET;
  console.log("Cloudinary configured from individual env vars");
}

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Cloudinary env vars missing:", {
    cloudName: !!cloudName,
    apiKey: !!apiKey,
    apiSecret: !!apiSecret,
    hasCloudinaryUrl: !!cloudinaryUrl,
  });
}

// Configurar Cloudinary
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

// Exportar cloudinary configurado
export { cloudinary };

// Función para subir un archivo a Cloudinary
export async function uploadImageToCloudinary(file: File) {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary credentials are not configured. Please check your environment variables (CLOUDINARY_URL or individual vars).");
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
