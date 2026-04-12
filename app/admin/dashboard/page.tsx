"use client";

import AuthGuard from "@/app/components/AuthGuard";

export default function AdminDashboardPage() {
  return (
    <AuthGuard requiredRole="admin">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-blue-900">
          Admin Dashboard
        </h1>
      </div>
    </AuthGuard>
  );
}
