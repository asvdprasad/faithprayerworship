"use client";

import { useEffect, useState, useTransition } from "react";
import AuthGuard from "@/app/components/AuthGuard";
import { addUser, getAllUsers, type UserRole } from "@/app/actions/userActions";

type UserSummary = {
  username: string;
  role: UserRole;
};

export default function AdminUsersPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const refreshUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleAddUser = () => {
    setMessage("");
    setMessageType("");

    startTransition(async () => {
      const result = await addUser(username, password, role);

      setMessage(result.message);
      setMessageType(result.success ? "success" : "error");

      if (result.success) {
        setUsername("");
        setPassword("");
        setRole("user");
        await refreshUsers();
      }
    });
  };

  return (
    <AuthGuard requiredRole="admin">
      <div className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold text-blue-900">Add Users</h1>

          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="rounded border px-3 py-2"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Initial Password"
              className="rounded border px-3 py-2"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="rounded border px-3 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mt-4">
            <button
              onClick={handleAddUser}
              disabled={isPending}
              className="rounded bg-blue-900 px-4 py-2 text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Add User"}
            </button>
          </div>

          {message && (
            <p
              className={`mt-4 text-sm ${
                messageType === "error"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold text-blue-900">
            Existing Users
          </h2>

          {users.length === 0 ? (
            <p className="text-gray-600">No users found.</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center justify-between rounded border p-3"
                >
                  <span className="font-medium">{user.username}</span>
                  <span className="text-sm text-gray-600">{user.role}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}