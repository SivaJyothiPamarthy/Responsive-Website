# Module 2 — Exercises

## 2.1 Type the data

Annotate the following so that TS catches mistakes:

```ts
const user = {
  id: 1,
  name: "Ada",
  email: "ada@example.com",
  roles: ["admin", "editor"],
  createdAt: new Date(),
};
```

Write a `type User = ...` that matches. Then change `roles` to `["admin", "owner"]` only — what's the most precise type?

## 2.2 `unknown` first

Write `function safeLength(value: unknown): number` that returns:
- `value.length` if it's a string or array,
- `0` otherwise.

You may not use `as`. You may not use `any`.

## 2.3 Literal union vs enum

Replace this enum with a string-literal union and rewrite the function:

```ts
enum HttpMethod { GET, POST, PUT, DELETE }
function request(method: HttpMethod, url: string) { /* ... */ }
```

## 2.4 `satisfies`

Given `type Theme = Record<"light" | "dark", { bg: string; fg: string }>`,
build a `themes` object so that:
- it `satisfies Theme`,
- `themes.light.bg.toUpperCase()` works (i.e. `bg` is inferred as `string`, not `string`-widened from a union).

→ Solutions in `solutions.ts`.
