"use server";

import fs from "fs";
import path from "path";

export type UserRole = "admin" | "user";

export type StoredUser = {
  username: string;
  password: string;
  role: UserRole;
};

const usersFilePath = path.join(process.cwd(), "data", "users.json");

function ensureUsersFile() {
  const dir = path.dirname(usersFilePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(usersFilePath)) {
    const seedData = {
      admin: {
        username: "admin",
        password: "admin123",
        role: "admin",
      },
      user: {
        username: "user",
        password: "user123",
        role: "user",
      },
    };

    fs.writeFileSync(usersFilePath, JSON.stringify(seedData, null, 2), "utf8");
  }
}

function readUsers(): Record<string, StoredUser> {
  ensureUsersFile();
  const raw = fs.readFileSync(usersFilePath, "utf8").trim();
  return raw ? JSON.parse(raw) : {};
}

function writeUsers(data: Record<string, StoredUser>) {
  ensureUsersFile();
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function validateUserLogin(username: string, password: string) {
  const users = readUsers();
  const found = users[username];

  if (!found || found.password !== password) {
    return null;
  }

  return {
    username: found.username,
    role: found.role,
  };
}

export async function addUser(
  username: string,
  password: string,
  role: UserRole
) {
  const normalizedUsername = username.trim();

  if (!normalizedUsername || !password.trim()) {
    return {
      success: false,
      message: "Username and password are required.",
    };
  }

  const users = readUsers();

  if (users[normalizedUsername]) {
    return {
      success: false,
      message: "User already exists.",
    };
  }

  users[normalizedUsername] = {
    username: normalizedUsername,
    password: password.trim(),
    role,
  };

  writeUsers(users);

  return {
    success: true,
    message: "User added successfully.",
  };
}

export async function getAllUsers() {
  const users = readUsers();

  return Object.values(users).map((user) => ({
    username: user.username,
    role: user.role,
  }));
}

export async function resetOwnPassword(
  username: string,
  currentPassword: string,
  newPassword: string
) {
  const users = readUsers();
  const user = users[username];

  if (!user) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  if (user.password !== currentPassword) {
    return {
      success: false,
      message: "Current password is incorrect.",
    };
  }

  if (!newPassword.trim()) {
    return {
      success: false,
      message: "New password is required.",
    };
  }

  user.password = newPassword.trim();
  users[username] = user;

  writeUsers(users);

  return {
    success: true,
    message: "Password updated successfully.",
  };
}