export type UserRole = "admin" | "user";

export type AppUser = {
  username: string;
  role: UserRole;
};

const STORAGE_KEY = "fpw_user";

export function setLoggedInUser(user: AppUser) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("auth-changed"));
  }
}

export function getUser(): AppUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AppUser;
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("auth-changed"));
  }
}