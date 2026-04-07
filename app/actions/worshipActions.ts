"use server";

import { revalidatePath } from "next/cache";
import { saveCurrentWeekSelection } from "../lib/worshipService";

export async function setCurrentWeekSongs(formData: FormData): Promise<void> {
  const selectedSongs = formData
    .getAll("selectedSongs")
    .map((value) => String(value));

  await saveCurrentWeekSelection(selectedSongs);

  revalidatePath("/worship");
  revalidatePath("/worship/current-week");
}

export async function clearCurrentWeekSongs(): Promise<void> {
  await saveCurrentWeekSelection([]);

  revalidatePath("/worship");
  revalidatePath("/worship/current-week");
}