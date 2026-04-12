"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import AuthGuard from "@/app/components/AuthGuard";
const MAX_MULTI_WEEK_DATES = 3;


const songsDirectory = path.join(process.cwd(), "data", "WorshipSongs");
const currentWeekFilePath = path.join(
  process.cwd(),
  "data",
  "currentWeekSelections.json"
);
const multiWeekFilePath = path.join(
  process.cwd(),
  "data",
  "multiWeekPlans.json"
);

function sanitizeFileName(name: string) {
  return name.replace(/[\\/:*?"<>|]/g, "").trim();
}

function ensureJsonFile(filePath: string) {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}", "utf8");
  }
}

function readJsonFile(filePath: string) {
  ensureJsonFile(filePath);
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  return raw ? JSON.parse(raw) : {};
}

function writeJsonFile(filePath: string, data: unknown) {
  ensureJsonFile(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function addSong(formData: FormData) {
  const name = (formData.get("songName") as string)?.trim();
  const lyrics = (formData.get("lyrics") as string)?.trim();

  if (!name || !lyrics) {
    return { success: false, message: "Song name and lyrics are required." };
  }

  const safeName = sanitizeFileName(name);
  const songFilePath = path.join(songsDirectory, `${safeName}.txt`);

  if (!fs.existsSync(songsDirectory)) {
    fs.mkdirSync(songsDirectory, { recursive: true });
  }

  if (fs.existsSync(songFilePath)) {
    return { success: false, message: "Song already exists." };
  }

  fs.writeFileSync(songFilePath, lyrics, "utf8");

  revalidatePath("/worship");

  return { success: true, message: "Song added successfully!" };
}

export async function saveCurrentWeek(username: string, songs: string[]) {
  const data = readJsonFile(currentWeekFilePath);

  data[username] = songs;

  writeJsonFile(currentWeekFilePath, data);

  return { success: true };
}

export async function getCurrentWeek(username: string) {
  const data = readJsonFile(currentWeekFilePath);
  return data[username] || [];
}

export async function getMultiWeekPlan(username: string) {
  const data = readJsonFile(multiWeekFilePath);
  return data[username] || {};
}

export async function appendMultiWeekSongs(
  username: string,
  week: string,
  songs: string[]
) {
  const data = readJsonFile(multiWeekFilePath);

  if (!data[username]) {
    data[username] = {};
  }

  const userPlan = data[username];
  const existingDates = Object.keys(userPlan);
  const isNewDate = !userPlan[week];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(`${week}T00:00:00`);

  if (Number.isNaN(selectedDate.getTime())) {
    return {
      success: false,
      message: "Please select a valid date.",
    };
  }

  if (selectedDate < today) {
    return {
      success: false,
      message: "Please select a future date.",
    };
  }
// Restricting to a maximum of 3 planned dates per user to prevent clutter and encourage focus on a few weeks at a time.
  if (isNewDate && existingDates.length >= MAX_MULTI_WEEK_DATES) {
    return {
      success: false,
      message: `You can plan a maximum of ${MAX_MULTI_WEEK_DATES} dates.`,
    };
  }

  const existingSongs = userPlan[week] || [];
  userPlan[week] = [...new Set([...existingSongs, ...songs])];

  writeJsonFile(multiWeekFilePath, data);

  return {
    success: true,
    message: "Songs added to Multi-Week Plan.",
  };
}

export async function clearMultiWeekForWeek(username: string, week: string) {
  const data = readJsonFile(multiWeekFilePath);

  if (!data[username]) {
    return { success: false, message: "No plan found for user." };
  }

  delete data[username][week];

  writeJsonFile(multiWeekFilePath, data);

  return { success: true, message: "Selected week cleared successfully." };
}

export async function clearCurrentWeek(username: string) {
  const data = readJsonFile(currentWeekFilePath);

  delete data[username];

  writeJsonFile(currentWeekFilePath, data);

  return { success: true };
}

export async function appendCurrentWeekSongs(
  username: string,
  songs: string[]
) {
  const data = readJsonFile(currentWeekFilePath);

  const existingSongs = data[username] || [];
  data[username] = [...new Set([...existingSongs, ...songs])];

  writeJsonFile(currentWeekFilePath, data);

  return { success: true, message: "Songs added to Current Week Plan." };
}

export async function getSongTitleMap() {
  if (!fs.existsSync(songsDirectory)) {
    return {};
  }

  const fileNames = fs.readdirSync(songsDirectory);

  const map: Record<string, string> = {};

  fileNames
    .filter((fileName) => fileName.toLowerCase().endsWith(".txt"))
    .forEach((fileName) => {
      const slug = fileName
        .replace(/\.txt$/i, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

      const title = fileName.replace(/\.txt$/i, "");
      map[slug] = title;
    });

  return map;
}
