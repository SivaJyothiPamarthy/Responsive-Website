// 7.1 — recursive Awaited
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

type _T1 = MyAwaited<Promise<Promise<string>>>;  // string
type _T2 = MyAwaited<number>;                    // number

// 7.2 — DeepReadonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Config = { server: { host: string; ports: number[] } };
type _RoConfig = DeepReadonly<Config>;

// 7.3 — derive from an `as const` map
const routes = { home: "/", user: "/users/:id" } as const;
type RouteName = keyof typeof routes;                  // "home" | "user"
type RoutePath = typeof routes[keyof typeof routes];   // "/" | "/users/:id"

const _r1: RouteName = "user";
const _r2: RoutePath = "/users/:id";

// 7.4 — Path<T> with template literals
type Path<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends object
    ? Path<T[K], `${Prefix}${K}.`> | `${Prefix}${K}`
    : `${Prefix}${K}`;
}[keyof T & string];

type T = { a: { b: { c: number }; d: string } };
type _P = Path<T>;
// "a" | "a.b" | "a.b.c" | "a.d"

const ok: _P = "a.b.c";
console.log(ok);

export {};
