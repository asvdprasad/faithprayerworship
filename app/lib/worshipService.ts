import fs from "fs";
import path from "path";

const worshipSongsDirectory = path.join(process.cwd(), "data", "WorshipSongs");
const currentWeekSelectionFile = path.join(
  process.cwd(),
  "data",
  "currentWeekSelection.json"
);

function toSlug(fileName: string) {
  return fileName
    .replace(/\.txt$/i, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function getCurrentWeekSongContent(slug: string) {
  const selected = getCurrentWeekSelection();
  const allSongs = getAllSongs();

  if (!selected.includes(slug)) {
    return null;
  }

  return getSongContent(slug);
}

export function searchCurrentWeekSongs(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return [];

  const selected = getCurrentWeekSelection();

  return selected
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
      (song) =>
        song &&
        (song.title.toLowerCase().includes(normalizedQuery) ||
          song.lyrics.toLowerCase().includes(normalizedQuery))
    );
}

function ensureSelectionFileExists() {
  if (!fs.existsSync(currentWeekSelectionFile)) {
    fs.writeFileSync(currentWeekSelectionFile, "[]", "utf8");
  }
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

export function getCurrentWeekSelection(): string[] {
  ensureSelectionFileExists();

  const raw = fs.readFileSync(currentWeekSelectionFile, "utf8");

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCurrentWeekSelection(slugs: string[]) {
  ensureSelectionFileExists();

  fs.writeFileSync(
    currentWeekSelectionFile,
    JSON.stringify(slugs, null, 2),
    "utf8"
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