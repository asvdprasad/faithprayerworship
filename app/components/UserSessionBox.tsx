"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, logoutUser, type AppUser } from "@/app/lib/auth";

export default function UserSessionBox() {
  const router = useRouter();
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/20 px-3 py-2 text-sm text-white">
      <span>
        {user.username} ({user.role})
      </span>
      <button
        onClick={handleLogout}
        className="rounded bg-white/20 px-3 py-1 hover:bg-white/30"
      >
        Logout
      </button>
    </div>
  );
}