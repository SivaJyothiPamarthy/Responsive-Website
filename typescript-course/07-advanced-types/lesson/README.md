# Module 7 — Advanced Types

> References: [keyof](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html), [typeof](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html), [Indexed Access](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html), [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

This is where TypeScript becomes a small, total functional language *over types themselves*.

## 7.1 Union (`|`) and intersection (`&`) — the deep dive

```ts
type Cat = { name: string; meow(): void };
type Dog = { name: string; bark(): void };

type CatOrDog = Cat | Dog;       // either
type CatAndDog = Cat & Dog;       // both — has meow AND bark
```

Union narrows access to the *common* members: on `CatOrDog` you can read `name`, but you must narrow before calling `meow` or `bark`.

Intersection is *additive*. With conflicting primitives it produces `never`:
`type X = string & number  // never`.

## 7.2 Discriminated unions, again — the canonical pattern

```ts
type Action =
  | { type: "INC"; by: number }
  | { type: "DEC"; by: number }
  | { type: "RESET" };

function reduce(state: number, a: Action): number {
  switch (a.type) {
    case "INC":   return state + a.by;
    case "DEC":   return state - a.by;
    case "RESET": return 0;
  }
}
```

Adding a `discriminant` field (`type`, `kind`, `tag`) is one of the highest-leverage things you can do for code quality.

## 7.3 `keyof T`

```ts
type User = { id: number; name: string; email: string };

type UserKey = keyof User;   // "id" | "name" | "email"
```

`keyof` is the *type* of the keys of a type.

## 7.4 Indexed access types: `T[K]`

```ts
type IdType   = User["id"];          // number
type NameOrId = User["id" | "name"]; // number | string
type AllVals  = User[keyof User];    // number | string  (every value type)
```

## 7.5 `typeof` — type from a value

```ts
const config = {
  port: 3000,
  host: "localhost",
} as const;

type Config = typeof config;
// { readonly port: 3000; readonly host: "localhost" }

type Port = typeof config.port;   // 3000
```

Combine with `keyof` for "values of an object literal":

```ts
const Roles = { Admin: "admin", User: "user", Guest: "guest" } as const;
type Role = typeof Roles[keyof typeof Roles];  // "admin" | "user" | "guest"
```

This pattern replaces `enum` in modern TS code.

## 7.6 Conditional types

```ts
type IsString<T> = T extends string ? true : false;
type A = IsString<"hi">;   // true
type B = IsString<42>;     // false
```

Conditional types over unions distribute:

```ts
type ToArray<T> = T extends unknown ? T[] : never;
type R = ToArray<string | number>;  // string[] | number[]
```

Use `[T] extends [U]` to *prevent* distribution:

```ts
type ToArrayNoDist<T> = [T] extends [unknown] ? T[] : never;
type R2 = ToArrayNoDist<string | number>;  // (string | number)[]
```

## 7.7 `infer` — pattern matching on types

```ts
type ReturnTypeOf<F> = F extends (...args: any[]) => infer R ? R : never;

type R = ReturnTypeOf<() => string>;   // string
```

`infer` introduces a type variable inside an `extends` clause. Examples in the wild:

```ts
type ElementOf<T> = T extends Array<infer U> ? U : never;
type FirstParam<F> = F extends (a: infer P, ...rest: any) => any ? P : never;
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;  // (built-in)
```

## 7.8 Mapped types (preview, formal in module 8)

```ts
type ReadonlyAll<T> = { readonly [K in keyof T]: T[K] };

type RoUser = ReadonlyAll<{ id: number; name: string }>;
// { readonly id: number; readonly name: string }
```

## 7.9 Template literal types

```ts
type Greeting = `Hello, ${string}!`;
type Lang     = "en" | "ja";
type Hi       = `hi-${Lang}`;     // "hi-en" | "hi-ja"

type EventName<T extends string> = `on${Capitalize<T>}`;
type Names = EventName<"click" | "hover">;  // "onClick" | "onHover"
```

Combined with `keyof`, you can derive route or action names automatically:

```ts
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserSetters = Setters<{ name: string; age: number }>;
// { setName: (v: string) => void; setAge: (v: number) => void }
```

## 7.10 The four built-in string-literal helpers

`Uppercase<S>`, `Lowercase<S>`, `Capitalize<S>`, `Uncapitalize<S>` — for transforming literal strings at the type level.

---

## ✅ Checklist

- [ ] You used `keyof` and `T[K]` together.
- [ ] You used `as const` + `typeof` to get a literal-typed object.
- [ ] You wrote a conditional type with `infer`.
- [ ] You wrote a template literal type.

→ Continue to **[Module 8 — Utility, Mapped & Conditional Types](../../08-utility-types/lesson/README.md)**
