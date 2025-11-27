import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import sharp from "sharp"

const MAX_WIDTH = 1920
const MAX_HEIGHT = 1080
const QUALITY = 80

async function optimizeImage(
  buffer: Buffer,
  filename: string,
): Promise<{ optimizedBuffer: Buffer; newFilename: string }> {
  // Get image metadata
  const metadata = await sharp(buffer).metadata()

  // Skip optimization for non-image files or already small images
  if (!metadata.width || !metadata.height) {
    return { optimizedBuffer: buffer, newFilename: filename }
  }

  // Calculate new dimensions while maintaining aspect ratio
  let width = metadata.width
  let height = metadata.height

  if (width > MAX_WIDTH) {
    height = Math.round((height * MAX_WIDTH) / width)
    width = MAX_WIDTH
  }

  if (height > MAX_HEIGHT) {
    width = Math.round((width * MAX_HEIGHT) / height)
    height = MAX_HEIGHT
  }

  // Convert to WebP with optimization
  const optimizedBuffer = await sharp(buffer)
    .resize(width, height, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toBuffer()

  // Change extension to .webp
  const newFilename = filename.replace(/\.(jpg|jpeg|png|gif|bmp|tiff)$/i, ".webp")

  console.log(
    `[v0] Image optimized: ${filename} (${buffer.length} bytes) -> ${newFilename} (${optimizedBuffer.length} bytes) - ${Math.round((1 - optimizedBuffer.length / buffer.length) * 100)}% reduction`,
  )

  return { optimizedBuffer, newFilename }
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")
  const skipOptimization = searchParams.get("skipOptimization") === "true"

  if (!filename || !request.body) {
    return NextResponse.json({ error: "Missing filename or file" }, { status: 400 })
  }

  try {
    // Read the request body into a buffer
    const arrayBuffer = await request.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Check if it's an image that can be optimized
    const isImage = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(filename)

    let finalBuffer = buffer
    let finalFilename = filename

    if (isImage && !skipOptimization) {
      try {
        const result = await optimizeImage(buffer, filename)
        finalBuffer = result.optimizedBuffer
        finalFilename = result.newFilename
      } catch (optimizeError) {
        // If optimization fails, upload original
        console.error("[v0] Image optimization failed, uploading original:", optimizeError)
      }
    }

    // Upload to Vercel Blob
    const blob = await put(finalFilename, finalBuffer, {
      access: "public",
    })

    return NextResponse.json({
      ...blob,
      originalSize: buffer.length,
      optimizedSize: finalBuffer.length,
      savings: Math.round((1 - finalBuffer.length / buffer.length) * 100),
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
