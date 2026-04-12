"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "@/app/lib/auth";
import {
  getMultiWeekPlan,
  clearMultiWeekForWeek,
  getSongTitleMap,
} from "@/app/actions/songActions";

type MultiWeekPlan = Record<string, string[]>;

export default function MultiWeekPlanPage() {
  const user = getUser();
  const username = user?.username;

  const [plans, setPlans] = useState<MultiWeekPlan>({});
  const [songTitleMap, setSongTitleMap] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!username) return;

      const [planData, titleMap] = await Promise.all([
        getMultiWeekPlan(username),
        getSongTitleMap(),
      ]);

      setPlans(planData);
      setSongTitleMap(titleMap);
    }

    loadData();
  }, [username]);

  const handleClearWeek = async (selectedWeek: string) => {
    if (!username) return;

    const result = await clearMultiWeekForWeek(username, selectedWeek);
    setMessage(result.message);

    if (result.success) {
      const updated = await getMultiWeekPlan(username);
      setPlans(updated);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-blue-900">
        Multi-Week Plan
      </h1>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <div className="space-y-4">
        {Object.keys(plans).length === 0 ? (
          <p className="text-gray-600">No multi-week plan added yet.</p>
        ) : (
          Object.entries(plans).map(([weekName, songs]) => (
            <div key={weekName} className="rounded border p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold text-blue-900">
                  Week: {weekName}
                </h2>

                <button
                  onClick={() => handleClearWeek(weekName)}
                  className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Clear Selection
                </button>
              </div>

              <ul className="mt-3 space-y-2 text-gray-700">
                {songs.map((slug, index) => (
                  <li key={index}>
                    <Link
                      href={`/worship/${slug}`}
                      className="text-blue-700 hover:underline"
                    >
                      • {songTitleMap[slug] || slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}