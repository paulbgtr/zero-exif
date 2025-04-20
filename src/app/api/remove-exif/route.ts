import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

/**
 * Handles the POST request to remove EXIF data from an uploaded image.
 *
 * @param {NextRequest} request - The incoming request object containing the image file.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object containing the processed image or an error message.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const processedImageBuffer = await sharp(buffer)
      .jpeg({ quality: 100 })
      .toBuffer();

    return new NextResponse(processedImageBuffer, {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="clean_${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Error removing EXIF data:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
