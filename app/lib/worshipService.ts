import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

const worshipSongsDirectory = path.join(process.cwd(), "data", "WorshipSongs");
const CURRENT_WEEK_COOKIE = "current-week-selection";

function toSlug(fileName: string) {
  return fileName
    .replace(/\.txt$/i, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function getAllSongs() {
  if (!fs.existsSync(worshipSongsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(worshipSongsDirectory);

  return fileNames
    .filter((fileName) => fileName.toLowerCase().endsWith(".txt"))
    .map((fileName) => ({
      slug: toSlug(fileName),
      fileName,
      title: fileName.replace(/\.txt$/i, ""),
    }));
}

export function getSongContent(slug: string) {
  if (!fs.existsSync(worshipSongsDirectory)) {
    return null;
  }

  const fileNames = fs.readdirSync(worshipSongsDirectory);
  const file = fileNames.find((fileName) => toSlug(fileName) === slug);

  if (!file) {
    return null;
  }

  const fullPath = path.join(worshipSongsDirectory, file);
  const content = fs.readFileSync(fullPath, "utf8");

  return {
    title: file.replace(/\.txt$/i, ""),
    lyrics: content,
  };
}

export async function getCurrentWeekSelection(): Promise<string[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CURRENT_WEEK_COOKIE)?.value;

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export async function saveCurrentWeekSelection(
  slugs: string[]
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(CURRENT_WEEK_COOKIE, JSON.stringify(slugs), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearCurrentWeekSelection(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CURRENT_WEEK_COOKIE);
}

export async function getCurrentWeekSongContent(slug: string) {
  const selected = await getCurrentWeekSelection();

  if (!selected.includes(slug)) {
    return null;
  }

  return getSongContent(slug);
}

export async function searchCurrentWeekSongs(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return [];

  const selected = await getCurrentWeekSelection();

  const songs = selected
    .map((slug) => {
      const song = getSongContent(slug);
      if (!song) return null;

      return {
        slug,
        title: song.title,
        lyrics: song.lyrics,
      };
    })
    .filter(
      (song): song is { slug: string; title: string; lyrics: string } =>
        song !== null
    );

  return songs.filter(
    (song) =>
      song.title.toLowerCase().includes(normalizedQuery) ||
      song.lyrics.toLowerCase().includes(normalizedQuery)
  );
}

export function searchSongs(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery || !fs.existsSync(worshipSongsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(worshipSongsDirectory);

  return fileNames
    .filter((fileName) => fileName.toLowerCase().endsWith(".txt"))
    .map((fileName) => {
      const fullPath = path.join(worshipSongsDirectory, fileName);
      const content = fs.readFileSync(fullPath, "utf8");

      return {
        slug: toSlug(fileName),
        title: fileName.replace(/\.txt$/i, ""),
        lyrics: content,
      };
    })
    .filter(
      (song) =>
        song.title.toLowerCase().includes(normalizedQuery) ||
        song.lyrics.toLowerCase().includes(normalizedQuery)
    );
}