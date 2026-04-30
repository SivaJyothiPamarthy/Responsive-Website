// keyof, typeof, indexed-access patterns

type User = { id: number; name: string; email: string };
type Key  = keyof User;                 // "id" | "name" | "email"
type Vals = User[keyof User];           // number | string

const config = { port: 3000, host: "localhost" } as const;
type Config = typeof config;            // { readonly port: 3000; readonly host: "localhost" }

const Roles = { Admin: "admin", User: "user", Guest: "guest" } as const;
type Role = typeof Roles[keyof typeof Roles];   // "admin" | "user" | "guest"

const _key: Key = "id";
const _role: Role = "admin";
console.log(_key, _role, config);

export {};
