import fs from "fs";
import path from "path";

const worshipSongsDirectory = path.join(process.cwd(), "data", "WorshipSongs");
const worshipSongsThisWeekDirectory = path.join(
  process.cwd(),
  "data",
  "WorshipSongsThisWeek"
);

function toSlug(fileName: string) {
  return fileName
    .replace(/\.txt$/i, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function getSongsFromDirectory(directory: string) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const fileNames = fs.readdirSync(directory);

  return fileNames
    .filter((fileName) => fileName.toLowerCase().endsWith(".txt"))
    .map((fileName) => ({
      slug: toSlug(fileName),
      fileName,
      title: fileName.replace(/\.txt$/i, ""),
    }));
}

function getSongContentFromDirectory(directory: string, slug: string) {
  if (!fs.existsSync(directory)) {
    return null;
  }

  const fileNames = fs.readdirSync(directory);

  const file = fileNames.find((fileName) => toSlug(fileName) === slug);

  if (!file) {
    return null;
  }

  const fullPath = path.join(directory, file);
  const content = fs.readFileSync(fullPath, "utf8");

  return {
    title: file.replace(/\.txt$/i, ""),
    lyrics: content,
  };
}

export function getAllSongs() {
  return getSongsFromDirectory(worshipSongsDirectory);
}

export function getSongContent(slug: string) {
  return getSongContentFromDirectory(worshipSongsDirectory, slug);
}

export function getCurrentWeekSongs() {
  return getSongsFromDirectory(worshipSongsThisWeekDirectory);
}

export function getCurrentWeekSongContent(slug: string) {
  return getSongContentFromDirectory(worshipSongsThisWeekDirectory, slug);
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