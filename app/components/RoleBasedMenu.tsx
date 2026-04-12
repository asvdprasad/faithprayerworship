"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, type AppUser } from "@/app/lib/auth";

type MenuProps = {
  mobile?: boolean;
};

export default function RoleBasedMenu({ mobile = false }: MenuProps) {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const syncUser = () => {
      setUser(getUser());
    };

    syncUser();

    window.addEventListener("auth-changed", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth-changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const mainLinkClass = mobile
    ? "block rounded px-3 py-2 hover:bg-blue-50"
    : "block rounded px-3 py-2 hover:bg-white/20";

  const sectionTitleClass = mobile
    ? "mt-4 rounded px-3 py-2 font-medium text-blue-900"
    : "mt-4 rounded px-3 py-2 font-medium text-white";

  const sectionWrapClass = mobile
    ? "ml-4 space-y-1 border-l border-blue-200 pl-3"
    : "ml-4 space-y-1 border-l border-white/30 pl-3";

  const subLinkClass = mobile
    ? "block rounded px-3 py-2 text-sm hover:bg-blue-50"
    : "block rounded px-3 py-2 text-sm hover:bg-white/20";

  return (
    <nav className="space-y-2">
      <Link href="/" className={mainLinkClass}>
        Home
      </Link>

      <Link href="/articles" className={mainLinkClass}>
        Articles
      </Link>

      <Link href="/prayer-notes" className={mainLinkClass}>
        Prayer Request
      </Link>

      <Link href="/media" className={mainLinkClass}>
        Media
      </Link>

      {!user && (
        <Link href="/login" className={mainLinkClass}>
          Login
        </Link>
      )}

      {user?.role === "user" && (
        <>
          <div className={sectionTitleClass}>User Dashboard</div>

          <div className={sectionWrapClass}>
            <Link href="/dashboard" className={subLinkClass}>
              User Dashboard
            </Link>

            <Link href="/worship" className={subLinkClass}>
              Worship Songs
            </Link>

            <Link href="/worship/current-week" className={subLinkClass}>
              Current Week Plan
            </Link>

            <Link href="/plan" className={subLinkClass}>
              Multi-Week Plan
            </Link>

            <Link href="/reset-password" className={subLinkClass}>
              Reset Password
            </Link>

          </div>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <div className={sectionTitleClass}>Admin Dashboard</div>

          <div className={sectionWrapClass}>
            <Link href="/admin/dashboard" className={subLinkClass}>
              Admin Dashboard
            </Link>

            <Link href="/worship" className={subLinkClass}>
              Worship Songs
            </Link>

            <Link href="/worship/add-song" className={subLinkClass}>
              Add Worship Song
            </Link>

            <Link href="/admin/current-week" className={subLinkClass}>
              Manage Current Week
            </Link>

            <Link href="/admin/plan" className={subLinkClass}>
              Manage Multi-Week Plan
            </Link>

            <Link href="/admin/users" className={subLinkClass}>
              Add Users
            </Link>

            <Link href="/reset-password" className={subLinkClass}>
              Reset Password
            </Link>            
          </div>
        </>
      )}
    </nav>
  );
}