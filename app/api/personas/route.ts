import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export async function GET() {
  const dir = path.join(process.cwd(), "public", "images", "personas");

  let files: string[] = [];
  try {
    files = await readdir(dir);
  } catch {
    files = [];
  }

  const photos = files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .map((file) => `/images/personas/${encodeURIComponent(file)}`);

  return NextResponse.json({ photos });
}
