"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, type AppUser } from "@/app/lib/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  if (!user) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-red-700">Access Denied</h1>
        <p className="mt-2 text-gray-700">Please log in first.</p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-blue-900">Dashboard</h1>
        <p className="mt-2 text-gray-700">
          Welcome, <strong>{user.username}</strong> ({user.role})
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/worship"
          className="rounded-2xl bg-white p-5 shadow hover:bg-blue-50"
        >
          <h2 className="text-lg font-semibold text-blue-900">Worship Songs</h2>
          <p className="mt-1 text-sm text-gray-600">Browse all songs</p>
        </Link>

        <Link
          href="/worship/current-week"
          className="rounded-2xl bg-white p-5 shadow hover:bg-blue-50"
        >
          <h2 className="text-lg font-semibold text-blue-900">Current Week Plan</h2>
          <p className="mt-1 text-sm text-gray-600">View this week’s selected songs</p>
        </Link>

        <Link
          href="/plan"
          className="rounded-2xl bg-white p-5 shadow hover:bg-blue-50"
        >
          <h2 className="text-lg font-semibold text-blue-900">Multi-Week Plan</h2>
          <p className="mt-1 text-sm text-gray-600">View future worship plans</p>
        </Link>

        {user.role === "admin" ? (
          <Link
            href="/admin/current-week"
            className="rounded-2xl bg-white p-5 shadow hover:bg-blue-50"
          >
            <h2 className="text-lg font-semibold text-blue-900">Admin</h2>
            <p className="mt-1 text-sm text-gray-600">Manage weekly worship selection</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

