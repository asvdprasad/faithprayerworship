import { notFound } from "next/navigation";
import { getSongContent } from "../../lib/worshipService";

export default async function WorshipSongPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const song = getSongContent(slug);

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