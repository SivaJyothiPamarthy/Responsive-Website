// 2.1
type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];          // any list of role strings
  createdAt: Date;
};

// most precise version of roles:
type UserStrict = {
  id: number;
  name: string;
  email: string;
  roles: ReadonlyArray<"admin" | "editor" | "owner">;
  createdAt: Date;
};

// 2.2
function safeLength(value: unknown): number {
  if (typeof value === "string") return value.length;
  if (Array.isArray(value))      return value.length;
  return 0;
}

// 2.3
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
function request(method: HttpMethod, url: string) {
  console.log(method, url);
}

// 2.4
type Theme = Record<"light" | "dark", { bg: string; fg: string }>;
const themes = {
  light: { bg: "#fff", fg: "#000" },
  dark:  { bg: "#000", fg: "#fff" },
} satisfies Theme;

themes.light.bg.toUpperCase(); // ✅

export {};
