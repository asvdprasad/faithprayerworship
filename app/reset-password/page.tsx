"use client";

import { useState, useTransition } from "react";
import { getUser } from "@/app/lib/auth";
import { resetOwnPassword } from "@/app/actions/userActions";

export default function ResetPasswordPage() {
  const user = getUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    setMessage("");
    setMessageType("");

    if (!user?.username) {
      setMessage("Please log in first.");
      setMessageType("error");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    startTransition(async () => {
      const result = await resetOwnPassword(
        user.username,
        currentPassword,
        newPassword
      );

      setMessage(result.message);
      setMessageType(result.success ? "success" : "error");

      if (result.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    });
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold text-blue-900">
        Reset Password
      </h1>

      <div className="space-y-4">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full rounded border px-3 py-2"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full rounded border px-3 py-2"
        />

        <button
          onClick={handleReset}
          disabled={isPending}
          className="w-full rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 disabled:opacity-60"
        >
          {isPending ? "Updating..." : "Reset Password"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              messageType === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}