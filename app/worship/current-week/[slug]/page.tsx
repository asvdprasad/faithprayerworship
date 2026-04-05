import { notFound } from "next/navigation";
import { getCurrentWeekSongContent } from "../../../lib/worshipService";

export default async function CurrentWeekWorshipSongPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const song = getCurrentWeekSongContent(slug);

  if (!song) {
    notFound();
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">{song.title}</h1>
      <div className="whitespace-pre-line leading-8 text-gray-800">
        {song.lyrics}
      </div>
    </div>
  );
}