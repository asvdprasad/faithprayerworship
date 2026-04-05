"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const songsDirectory = path.join(process.cwd(), "data", "WorshipSongs");

function sanitizeFileName(name: string) {
  return name.replace(/[\\/:*?"<>|]/g, "").trim();
}

export async function addSong(formData: FormData) {
  const name = (formData.get("songName") as string)?.trim();
  const lyrics = (formData.get("lyrics") as string)?.trim();

  if (!name || !lyrics) {
    return { success: false, message: "Song name and lyrics are required." };
  }

  const safeName = sanitizeFileName(name);
  const filePath = path.join(songsDirectory, `${safeName}.txt`);

  if (fs.existsSync(filePath)) {
    return { success: false, message: "Song already exists." };
  }

  fs.writeFileSync(filePath, lyrics, "utf8");

  revalidatePath("/worship");

  return { success: true, message: "Song added successfully!" };
}