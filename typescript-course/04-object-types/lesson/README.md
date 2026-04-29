# Module 4 — Object Types & Interfaces

> Reference: [Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)

## 4.1 `type` vs `interface`

```ts
type User1 = {
  id: number;
  name: string;
};

interface User2 {
  id: number;
  name: string;
}
```

Both describe object shapes. **Differences:**

| Feature                      | `type`                         | `interface`                  |
|------------------------------|--------------------------------|------------------------------|
| Object shape                 | ✅                             | ✅                           |
| Union / intersection / tuple | ✅                             | ❌                           |
| `extends`                    | via `&` intersection           | ✅ native                    |
| Declaration merging          | ❌                             | ✅                           |
| Re-opening across files      | ❌                             | ✅                           |

**Rule of thumb:** prefer `interface` for public, extensible object contracts; prefer `type` for unions, tuples, mapped/conditional types, anything not a plain object shape.

## 4.2 Optional, readonly, and `?`/`!`

```ts
interface Profile {
  readonly id: number;     // can't be reassigned
  name: string;
  bio?: string;            // optional
}

const p: Profile = { id: 1, name: "ada" };
p.bio = "engineer";        // OK
// p.id = 2;               // ❌ readonly
```

`?` makes the property optional (`string | undefined`). `readonly` is *shallow* — properties of nested objects are still mutable.

## 4.3 Index signatures

For "any key of this kind, value of that kind":

```ts
interface Dictionary {
  [key: string]: number;
}

const counts: Dictionary = { ts: 1, js: 2 };
counts.python = 3;       // ✅
// counts.python = "x";  // ❌ value must be number
```

You can mix index signatures with known keys, *as long as the known keys are assignable to the index*:

```ts
interface Headers {
  "content-type": string;
  [name: string]: string;   // every other header
}
```

## 4.4 Excess property checks

A common source of confusion: object **literals** are checked more strictly than variables.

```ts
interface Box { width: number; height: number; }

function paint(b: Box) {}

paint({ width: 1, height: 2, depth: 3 });    // ❌ excess "depth"
const b = { width: 1, height: 2, depth: 3 };
paint(b);                                     // ✅ no excess check on a variable
```

This is intentional — typos in literals usually mean a bug. To opt out, use `as Box` or add an index signature.

## 4.5 Extending and intersecting

### `interface` extends

```ts
interface Animal { name: string }
interface Dog extends Animal { breed: string }
```

### `type` intersects

```ts
type Animal = { name: string };
type Dog = Animal & { breed: string };
```

Both produce essentially the same shape. Intersection is more powerful (can combine unions, etc.) but interfaces give better error messages and merging.

## 4.6 Readonly arrays and tuples

```ts
const xs: readonly number[] = [1, 2, 3];
// xs.push(4);  // ❌

type Pair = readonly [string, number];
const p: Pair = ["age", 30];
// p[0] = "name";  // ❌
```

`ReadonlyArray<T>` is the verbose form. `readonly T[]` is the same thing.

## 4.7 Recursive / self-referential types

```ts
interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };
```

## 4.8 Declaration merging

Multiple `interface` blocks with the same name **merge**:

```ts
interface Window { ts: { version: string } }
interface Window { ts: { version: string; ready: boolean } }
// Effective: Window has both fields under ts.
```

Useful for augmenting library types (`declare module "...".

## 4.9 `Pick`/`Omit`/`Partial`/`Required` preview

We cover these in module 8, but a quick taste:

```ts
type NewUser = Omit<User, "id" | "createdAt">;
type Patch   = Partial<User>;
```

---

## ✅ Checklist

- [ ] You know when to use `interface` vs `type`.
- [ ] You added an index signature.
- [ ] You hit (and understood) excess property checking.
- [ ] You extended an interface.
- [ ] You declared a recursive type.

→ Continue to **[Module 5 — Classes](../../05-classes/lesson/README.md)**
