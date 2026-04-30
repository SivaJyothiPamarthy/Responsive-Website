# Module 6 — Generics

> Reference: [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

Generics let you write code that works with **a type you don't yet know**, while still keeping it precisely typed at the callsite. They are TypeScript's most powerful feature.

## 6.1 The motivation

Without generics:

```ts
function firstAny(xs: any[]): any { return xs[0]; }
const n = firstAny([1, 2, 3]);  // type: any  ← we lost the info
```

With generics:

```ts
function first<T>(xs: T[]): T | undefined { return xs[0]; }
const n = first([1, 2, 3]);     // type: number | undefined
```

`T` is a *type variable* — a placeholder filled in by inference at each call.

## 6.2 Generic functions

```ts
function identity<T>(value: T): T { return value; }

identity(1);       // T = number
identity("hi");    // T = string
identity<boolean>(true);  // explicit T
```

Multi-parameter generics:

```ts
function zip<A, B>(as: A[], bs: B[]): Array<[A, B]> {
  return as.map((a, i) => [a, bs[i]]);
}
```

## 6.3 Generic constraints (`extends`)

You often want "any T, *as long as* T has property X":

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("alpha", "beta");
longest([1,2,3], [4,5]);
// longest(1, 2);   // ❌ number has no `.length`
```

## 6.4 Default type parameters

```ts
type ApiResult<T = unknown> = { ok: boolean; data: T };

const r: ApiResult = { ok: true, data: 123 };          // T = unknown
const r2: ApiResult<string> = { ok: true, data: "hi" };
```

## 6.5 Generic interfaces and classes

```ts
interface Repo<T> {
  get(id: string): Promise<T | null>;
  save(item: T): Promise<void>;
}

class InMemoryRepo<T extends { id: string }> implements Repo<T> {
  private store = new Map<string, T>();
  async get(id: string)  { return this.store.get(id) ?? null; }
  async save(item: T)    { this.store.set(item.id, item); }
}
```

## 6.6 The `keyof` constraint pattern

A canonical example. `getProp` works for any object, returning the precise type:

```ts
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const u = { id: 1, name: "ada" };
const id = getProp(u, "id");        // number
const nm = getProp(u, "name");      // string
// const x = getProp(u, "missing"); // ❌
```

Read this slowly: `K extends keyof T` says "K is one of the keys of T", and `T[K]` indexes into T to get the value type. We'll generalize this in module 7.

## 6.7 Generic type guards

You can write guards that preserve generic type info:

```ts
function isArrayOf<T>(arr: unknown, guard: (x: unknown) => x is T): arr is T[] {
  return Array.isArray(arr) && arr.every(guard);
}

const isString = (x: unknown): x is string => typeof x === "string";

const data: unknown = ["a", "b"];
if (isArrayOf(data, isString)) {
  data;   // string[]
}
```

## 6.8 `const` type parameters (TS 5.0+)

`const T` preserves literal narrowness in inference:

```ts
function tagged<const T>(values: T) { return values; }

const t1 = tagged(["a", "b"]);            // ["a", "b"]  ← literal tuple
// without `const`, t1 would be string[].
```

## 6.9 When *not* to use generics

If a function is only ever called with one type, just use that type. Adding `<T>` for the sake of it is a code smell. Generics earn their keep at boundaries (collections, repositories, factories, decorators) — not in business logic that handles a single domain object.

---

## ✅ Checklist

- [ ] You wrote a generic function with a constraint.
- [ ] You wrote a generic class.
- [ ] You used `keyof` with `T[K]`.
- [ ] You used `const` type parameters.

→ Continue to **[Module 7 — Advanced Types](../../07-advanced-types/lesson/README.md)**
