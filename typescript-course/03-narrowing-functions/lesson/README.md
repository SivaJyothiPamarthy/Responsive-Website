# Module 3 — Variables, Functions & Narrowing

> References: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [More on Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

## 3.1 Variable declarations

Same rules as JavaScript, but type *widening* depends on the declarator:

```ts
const a = "hello";   // type: "hello"   (literal — const = won't change)
let   b = "hello";   // type: string    (widened — let = might change)
```

This matters when assigning to typed positions:

```ts
type Mode = "auto" | "manual";
const m1 = "auto";        // "auto"
const ok: Mode = m1;      // ✅
let   m2 = "auto";        // string
const fail: Mode = m2;    // ❌ string isn't assignable to "auto" | "manual"
```

## 3.2 Function types

Three places types appear on a function:

```ts
function add(a: number, b: number): number {  // params + return
  return a + b;
}
```

You usually only need to annotate parameters — the return type is inferred. Annotate it explicitly when:
- the function is part of a public API,
- the return is "wide" and you want to *force* a narrower contract,
- you're hitting recursion or over-eager inference.

### Function type expressions

```ts
type BinaryOp = (a: number, b: number) => number;

const mul: BinaryOp = (a, b) => a * b;   // params inferred from BinaryOp
```

### Optional, default, and rest parameters

```ts
function greet(name: string, salutation = "Hello", suffix?: string) {
  return `${salutation}, ${name}${suffix ?? ""}`;
}

function sum(...ns: number[]): number {
  return ns.reduce((a, b) => a + b, 0);
}
```

### Call signatures & construct signatures

```ts
type Counter = {
  (label: string): number;     // call signature
  count: number;               // own property
};

type Buildable<T> = new (x: number) => T;  // construct signature
```

### Function overloads

When a function has *multiple legitimate type signatures*:

```ts
function len(s: string): number;
function len(arr: unknown[]): number;
function len(x: string | unknown[]): number {   // implementation
  return x.length;
}

len("hi");   // 2
len([1,2,3]); // 3
```

The implementation signature isn't visible to callers — only the overload signatures are.

> Prefer **union parameters** over overloads when possible — they're simpler and rarely wrong.

## 3.3 Narrowing

A variable can have a *broad* type at one point and a *narrower* type after a check. TypeScript follows your control flow.

### `typeof` guard

```ts
function pad(value: string | number, width: number): string {
  if (typeof value === "number") {
    return value.toString().padStart(width, "0");  // value: number here
  }
  return value.padStart(width, " ");                 // value: string here
}
```

### Truthiness narrowing

```ts
function first<T>(xs: T[] | null): T | undefined {
  if (xs && xs.length > 0) return xs[0];            // xs: T[]
  return undefined;
}
```

### Equality narrowing

```ts
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // a and b are both string here.
  }
}
```

### `in` operator

```ts
type Fish = { swim: () => void };
type Bird = { fly:  () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) animal.swim();
  else                   animal.fly();
}
```

### `instanceof`

```ts
function asDate(d: string | Date): Date {
  return d instanceof Date ? d : new Date(d);
}
```

### User-defined type guards (`x is T`)

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

const u: unknown = "hi";
if (isString(u)) u.toUpperCase();
```

### Discriminated unions (the workhorse)

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side:   number }
  | { kind: "rect";   w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side * s.side;
    case "rect":   return s.w * s.h;
  }
}
```

### Exhaustiveness checks with `never`

```ts
function area2(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side ** 2;
    case "rect":   return s.w * s.h;
    default: {
      const _exhaustive: never = s;   // ❌ if a new case is added
      return _exhaustive;
    }
  }
}
```

If you add a fourth shape, `_exhaustive: never` fails to compile until you handle it. **This pattern catches more bugs than tests.**

## 3.4 `this` parameter

You can declare `this` as a fake first parameter for type-safety:

```ts
function whoAmI(this: { name: string }) {
  return this.name;
}
```

It's erased at runtime; it only helps the type checker.

---

## ✅ Checklist

- [ ] You wrote a function type alias.
- [ ] You used a `typeof` and an `in` guard.
- [ ] You used a discriminated union with exhaustive `never`.
- [ ] You wrote a custom `x is T` guard.

→ Continue to **[Module 4 — Object Types & Interfaces](../../04-object-types/lesson/README.md)**
