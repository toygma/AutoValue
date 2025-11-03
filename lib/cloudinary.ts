import cloudinary from "cloudinary";
import "dotenv/config"

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_SECRET_KEY
) {
  throw new Error("Missing Cloudinary environment variables.");
}

interface UploadFile extends Blob {
  name: string;
  type: string
}

export const upload_file = async (file: UploadFile, folder: string) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64String = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64String}`;

    const result = await cloudinary.v2.uploader.upload(dataURI, {
      folder,
      resource_type: "auto",
      transformation: [
        { width: 1024, quality: "auto:good", fetch_format: "auto" },
      ],
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const delete_file = async (file: string): Promise<boolean> => {
  try {
    const res = await cloudinary.v2.uploader.destroy(file);
    return res?.result === "ok";
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};