"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, type AppUser, type UserRole } from "@/app/lib/auth";

type AuthGuardProps = {
  children: React.ReactNode;
  requiredRole?: UserRole;
};

export default function AuthGuard({
  children,
  requiredRole,
}: AuthGuardProps) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getUser());
    setReady(true);
  }, []);

  if (!ready) {
    return <div className="rounded-xl bg-white p-4 shadow">Loading...</div>;
  }

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

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-red-700">Access Denied</h1>
        <p className="mt-2 text-gray-700">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}