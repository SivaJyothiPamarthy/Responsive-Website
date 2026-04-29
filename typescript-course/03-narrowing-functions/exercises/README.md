# Module 3 — Exercises

## 3.1 Custom guard

Write `isNonEmptyString(v: unknown): v is string` that returns `true` only for non-empty strings. Use it in a function `loudly(input: unknown): string` that throws if the input is not a non-empty string, otherwise returns `input.toUpperCase()`.

## 3.2 Discriminated union

Model a `Result<T>` that is either `{ ok: true; value: T }` or `{ ok: false; error: string }`.
Then write a function `unwrap<T>(r: Result<T>): T` that throws when `ok` is false.

## 3.3 Exhaustive switch

Given:

```ts
type Event =
  | { type: "click";    x: number; y: number }
  | { type: "scroll";   delta: number }
  | { type: "keypress"; key: string };
```

Write `summarize(e: Event): string` using a switch that *forces a compile error if a new event variant is added* (without you updating the function).

## 3.4 Overload vs union

Write `parse` as overloads:
- `parse(input: string): unknown`
- `parse(input: string, asNumber: true): number`

Then rewrite it without overloads, using a union return type. Which version is easier for callers?

→ Solutions in `solutions.ts`.
