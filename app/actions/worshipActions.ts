"use server";

import { revalidatePath } from "next/cache";
import {
  clearCurrentWeekSelection,
  getCurrentWeekSelection,
  saveCurrentWeekSelection,
} from "../lib/worshipService";

export async function setCurrentWeekSongs(formData: FormData): Promise<void> {
  const newSelectedSongs = formData
    .getAll("selectedSongs")
    .map((value) => String(value));

  const existingSongs = await getCurrentWeekSelection();

  const mergedSongs = [...new Set([...existingSongs, ...newSelectedSongs])];

  await saveCurrentWeekSelection(mergedSongs);

  revalidatePath("/worship");
  revalidatePath("/worship/current-week");
}

export async function clearCurrentWeekSongs(): Promise<void> {
  await clearCurrentWeekSelection();

  revalidatePath("/worship");
  revalidatePath("/worship/current-week");
}