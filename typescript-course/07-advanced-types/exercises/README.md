# Module 7 — Exercises

## 7.1 `Awaited` (yes, the built-in)

Without using TS's built-in `Awaited<T>`, write your own `MyAwaited<T>` that recursively unwraps `Promise<Promise<...<T>>>` to `T`.

```ts
type T1 = MyAwaited<Promise<Promise<string>>>; // string
type T2 = MyAwaited<number>;                    // number
```

## 7.2 `DeepReadonly`

Write `DeepReadonly<T>` that recursively makes every nested property `readonly`. Test it on:

```ts
type Config = { server: { host: string; ports: number[] } };
type RoConfig = DeepReadonly<Config>;
// → { readonly server: { readonly host: string; readonly ports: readonly number[] } }
```

## 7.3 Routes from a literal

Given `const routes = { home: "/", user: "/users/:id" } as const;`,
derive `RouteName` (`"home" | "user"`) and `RoutePath` (`"/" | "/users/:id"`) from `routes`.

## 7.4 Template literal challenge

Write `Path<T>` that takes an object type and produces dotted-key strings:

```ts
type T = { a: { b: { c: number }; d: string } };
type P = Path<T>;
// "a" | "a.b" | "a.b.c" | "a.d"
```

→ Solutions in `solutions.ts`.
