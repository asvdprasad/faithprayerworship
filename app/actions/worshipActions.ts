"use server";

import { revalidatePath } from "next/cache";
import { saveCurrentWeekSelection } from "../lib/worshipService";

export async function setCurrentWeekSongs(formData: FormData) {
  const selectedSongs = formData.getAll("selectedSongs") as string[];

  saveCurrentWeekSelection(selectedSongs);

  revalidatePath("/worship");
  revalidatePath("/worship/current-week");
}

export async function clearCurrentWeekSongs() {
  saveCurrentWeekSelection([]);

  revalidatePath("/worship");
  revalidatePath("/worship/current-week");
}