import { NextResponse } from "next/server";
import { uploadImageToCloudinary } from "../../../lib/cloudinary";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const formData = await request.formData();
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  try {
    const imageUrl = await uploadImageToCloudinary(image);
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
