import { getAllSongs } from "../lib/worshipService";
import WorshipSongsSelector from "./WorshipSongsSelector";

export default function WorshipPage() {
  const songs = getAllSongs();

  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur md:p-6">
      <h1 className="mb-3 text-xl font-bold md:mb-4 md:text-2xl">
        Worship Songs
      </h1>

      <p className="mb-4 text-sm text-gray-600 md:mb-6 md:text-base">
        Select songs and submit them as Current Week Worship Songs.
      </p>

      <WorshipSongsSelector songs={songs} />
    </div>
  );
}