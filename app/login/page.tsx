"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setLoggedInUser } from "@/app/lib/auth";
import { validateUserLogin } from "@/app/actions/userActions";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const user = await validateUserLogin(username.trim(), password);

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    setLoggedInUser(user);
    router.refresh();
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow">
      <h1 className="mb-2 text-2xl font-bold text-blue-900">Login</h1>
      <p className="mb-6 text-sm text-gray-600">
        Sign in to access worship planning features
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Enter password"
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}