# Module 8 — Utility, Mapped & Conditional Types

> References: [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html), [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html), [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

You've already used a few utility types. This module is the full tour, plus how to write your own.

## 8.1 The built-in utility types you'll actually use

```ts
type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};
```

| Utility               | Result                                                          | Use case                              |
|-----------------------|------------------------------------------------------------------|---------------------------------------|
| `Partial<T>`          | All fields optional                                              | Update payloads, patches              |
| `Required<T>`         | All fields required (drops `?`)                                  | Strengthen a "loose" type             |
| `Readonly<T>`         | All fields readonly                                              | Immutable views                       |
| `Pick<T, K>`          | Subset of T containing only keys K                               | Public projections                    |
| `Omit<T, K>`          | T without keys K                                                 | "Same minus password"                 |
| `Record<K, V>`        | Object with keys K, values V                                     | Maps, dictionaries                    |
| `Exclude<T, U>`       | Members of T not in U                                            | Remove from union                     |
| `Extract<T, U>`       | Members of T also in U                                           | Filter union                          |
| `NonNullable<T>`      | T without `null \| undefined`                                    | After narrowing                       |
| `Parameters<F>`       | Tuple of F's parameters                                          | Re-apply functions                    |
| `ReturnType<F>`       | F's return type                                                  | Re-use a return shape                 |
| `Awaited<T>`          | Unwrap one or more `Promise`s                                    | Async handlers                        |
| `ConstructorParameters<C>` | Tuple for `new C(...)`                                       | Factory plumbing                      |
| `InstanceType<C>`     | Instance of class type C                                          | DI containers                         |
| `ThisParameterType<F>`| Type of `this` parameter                                          | Function metaprogramming              |
| `OmitThisParameter<F>`| Drop the `this` param                                             | Bind helpers                          |

Examples:

```ts
type NewUser   = Omit<User, "id">;
type SafeUser  = Omit<User, "password">;
type UserPatch = Partial<User>;
type UserMap   = Record<string, User>;
type ReqUser   = Required<UserPatch>;

function get<K extends keyof User>(u: User, key: K): User[K] { return u[key]; }
type GetReturn = ReturnType<typeof get>;   // User[keyof User]
```

## 8.2 Mapped types — the tool behind every utility

Every utility above is built from this:

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
```

`[K in keyof T]` is the mapped-type syntax — "for each key K of T, produce…".

### Modifiers: `+`, `-`

```ts
type Mutable<T>  = { -readonly [K in keyof T]: T[K] };
type Required<T> = { [K in keyof T]-?: T[K] };
```

`-readonly` removes the modifier; `-?` removes optionality.

### Key remapping with `as` (TS 4.1+)

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<{ name: string; age: number }>;
// { getName: () => string; getAge: () => number }
```

You can also drop keys by mapping them to `never`:

```ts
type RemoveBooleans<T> = {
  [K in keyof T as T[K] extends boolean ? never : K]: T[K];
};
```

## 8.3 Conditional types in real life

```ts
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataKeys = NonFunctionKeys<{ id: number; greet(): void }>;
// "id"
```

The pattern `{ [K in keyof T]: ... K ... never ... }[keyof T]` is *very* common — it computes a union of the keys that satisfy a condition.

### Distributive conditional types — recap

```ts
type ToArray<T> = T extends unknown ? T[] : never;
type R = ToArray<string | number>;   // string[] | number[]
```

Use `[T] extends [U]` to opt out of distribution.

## 8.4 The `infer` toolbox

```ts
type First<T extends readonly unknown[]> =
  T extends readonly [infer F, ...unknown[]] ? F : never;

type Last<T extends readonly unknown[]> =
  T extends readonly [...unknown[], infer L] ? L : never;

type StrSplit<S extends string, D extends string> =
  S extends `${infer Head}${D}${infer Tail}`
    ? [Head, ...StrSplit<Tail, D>]
    : [S];

type Parts = StrSplit<"a,b,c", ",">;  // ["a", "b", "c"]
```

> Type-level recursion is depth-limited (~50 in TS 5). Don't write a Turing machine — but a parser is fine.

## 8.5 Branded / nominal types

Structural typing means two types with identical shape are interchangeable. Sometimes you want a *nominal* distinction (e.g. `UserId` vs `OrderId`):

```ts
type Brand<T, B> = T & { readonly __brand: B };
type UserId  = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

const u = "u_1" as UserId;
const o: OrderId = u;       // ❌ different brand
```

## 8.6 `satisfies` (recap, with utility types)

```ts
const handlers = {
  click:    (e: MouseEvent)    => {},
  keydown:  (e: KeyboardEvent) => {},
} satisfies Record<string, (e: Event) => void>;

handlers.click;   // (e: MouseEvent) => void   ← preserved
```

---

## ✅ Checklist

- [ ] You used `Pick`, `Omit`, `Partial`, `Record`.
- [ ] You wrote your own mapped type with `as` remapping.
- [ ] You used `{ [K in keyof T]: ... }[keyof T]` to filter keys.
- [ ] You created a branded type.

→ Continue to **[Module 9 — Modules](../../09-modules/lesson/README.md)**
