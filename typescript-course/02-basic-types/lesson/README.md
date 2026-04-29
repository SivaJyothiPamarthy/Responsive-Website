# Module 2 — Basic Types

> Reference: [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

This module covers the **types you'll use 90% of the time**.

## 2.1 Primitive types

JavaScript's seven primitives, all mirrored in TypeScript:

```ts
let s: string = "hello";
let n: number = 42;        // floats, ints, NaN, Infinity all just `number`
let b: boolean = true;
let big: bigint = 100n;
let sym: symbol = Symbol("id");
let u: undefined = undefined;
let nu: null = null;
```

Don't write annotations when the value is on the same line — inference handles it:

```ts
let s = "hello";  // already string, no annotation needed
```

## 2.2 Arrays

Two equivalent syntaxes:

```ts
const xs: number[] = [1, 2, 3];
const ys: Array<number> = [1, 2, 3];
```

`number[]` is the convention; use `Array<T>` when `T` itself is complex (e.g. `Array<{ id: number }>`).

## 2.3 Tuples — fixed-length arrays

```ts
let pair: [string, number] = ["age", 30];
let rgb:  [number, number, number] = [255, 128, 0];

// Optional & rest in tuples (TS 4.0+):
type StrOrNumPair = [string, number?];
type Trailing<T> = [string, ...T[]];
```

A tuple is just an array with a stricter shape. `pair[2]` is a type error.

## 2.4 `any`, `unknown`, `never`, `void`

These four are easy to confuse:

| Type      | Meaning                                                       | Use it when…                                              |
|-----------|---------------------------------------------------------------|-----------------------------------------------------------|
| `any`     | Turns off type checking for this value.                       | **Almost never.** Last-resort escape hatch.               |
| `unknown` | "Some value, but I don't know what." Must narrow to use.      | Receiving data from outside (JSON, fetch, user input).    |
| `never`   | A value that *cannot* exist (function never returns, etc.).   | Exhaustiveness checks, impossible branches.               |
| `void`    | A function returns nothing meaningful.                        | Function return types only.                               |

```ts
function fail(msg: string): never {
  throw new Error(msg);
}

function log(msg: string): void {
  console.log(msg);
}

let value: unknown = JSON.parse("...");
// value.toUpperCase();  // Error: Object is of type 'unknown'.
if (typeof value === "string") {
  value.toUpperCase(); // OK — narrowed to string.
}
```

> **Rule of thumb**: prefer `unknown` over `any`. It forces you to handle the "I don't know" case at the boundary.

## 2.5 Literal types

A literal type narrows a value to a specific value:

```ts
let direction: "left" | "right" = "left";
direction = "up";   // Error: '"up"' is not assignable to '"left" | "right"'.
```

Combine with union (`|`) for tiny enum-like sets — usually nicer than `enum`:

```ts
type LogLevel = "debug" | "info" | "warn" | "error";
function log(level: LogLevel, msg: string) { /* ... */ }
log("debug", "boot");
log("trace", "..."); // ❌
```

## 2.6 Type aliases

`type` gives a name to any type:

```ts
type UserId = string;
type Point  = { x: number; y: number };
type ID     = string | number;
type Pair<T> = [T, T];
```

Aliases are *not* new types — they're names. `UserId` and `string` are interchangeable.

## 2.7 `enum` (and why you might skip it)

```ts
enum Role { Admin, User, Guest }   // numeric: 0, 1, 2
enum Color { R = "RED", G = "GREEN", B = "BLUE" } // string enum
```

Pros: handy ordered constants.
Cons: `enum` emits runtime code (an object), can be confusing across module boundaries, and union literal types do the job:

```ts
type Role = "Admin" | "User" | "Guest";   // preferred for most use cases
```

Use `const enum` if you want zero-cost inlining (but check `isolatedModules` compatibility).

## 2.8 `null` and `undefined` with `strictNullChecks`

With `"strict": true` (which is the default for new projects), `null` and `undefined` are *not* assignable to other types:

```ts
let name: string = null;       // ❌ in strict mode
let name2: string | null = null; // ✅
```

The non-null assertion `!` tells the compiler "trust me, it's not null":

```ts
const el = document.getElementById("app")!;
```

Use sparingly — it's a controlled `any`.

## 2.9 Type assertions: `as` and `<T>`

Tell the compiler "treat this as type X" — without runtime checks:

```ts
const input = document.querySelector("input") as HTMLInputElement;
const n = "42" as unknown as number; // double assertion - last-resort
```

`<HTMLInputElement>el` is the older syntax (won't work in `.tsx`). Prefer `as`.

## 2.10 The `satisfies` operator (TS 4.9+)

`satisfies` checks that a value matches a type *without widening* it:

```ts
type Palette = Record<"red" | "green" | "blue", string | [number, number, number]>;

const palette = {
  red:   [255, 0, 0],
  green: "#00ff00",
  blue:  [0, 0, 255],
} satisfies Palette;

palette.red[0];      // ✅ inferred as number, not string|number tuple
palette.green.toUpperCase(); // ✅ knows it's a string
```

`satisfies` is the modern way to *constrain* without *flattening*. Use it whenever you'd be tempted by `as Palette`.

---

## ✅ Checklist

- [ ] You can list 7 primitive types.
- [ ] You know when to use `unknown` vs `any`.
- [ ] You can write a union of string literals.
- [ ] You've used `satisfies`.

→ Continue to **[Module 3 — Variables, Functions & Narrowing](../../03-narrowing-functions/lesson/README.md)**
