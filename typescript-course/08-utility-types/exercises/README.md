# Module 8 — Exercises

## 8.1 `MyOmit`

Implement `MyOmit<T, K extends keyof T>` without using the built-in `Omit` or `Exclude`. Hint: combine a mapped type with `as`.

## 8.2 `Mutable`

Implement `Mutable<T>` that strips `readonly` from every property.

## 8.3 `OptionalKeys`

Implement `OptionalKeys<T>` that gives you the union of keys whose property is *optional*. Example:

```ts
type T = { a: string; b?: number; c?: boolean; d: Date };
type O = OptionalKeys<T>;   // "b" | "c"
```

## 8.4 `Branded` IDs

Make `UserId` and `PostId` mutually unassignable while still being assignable from raw strings via a `userId()` helper.

→ Solutions in `solutions.ts`.
