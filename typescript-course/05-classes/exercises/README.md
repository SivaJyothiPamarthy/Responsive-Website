# Module 5 — Exercises

## 5.1 Bank account

Build `class BankAccount` with:
- truly private balance (`#balance`),
- a `deposit(amount: number): void` method,
- a `withdraw(amount: number): boolean` (returns false if insufficient funds),
- a `readonly` `owner: string` set in the constructor.

Disallow direct reads/writes of `#balance` from outside.

## 5.2 Abstract `Vehicle`

Define `abstract class Vehicle` with `abstract maxSpeed(): number`. Make `Car`, `Bicycle`, `Plane` extend it. Add a non-abstract `describe()` that uses `maxSpeed()`.

## 5.3 Fluent builder

Build a fluent `class HttpRequestBuilder` with `method`, `url`, `header(k,v)`, `body(b)`, `build()`. Each setter returns `this`. Subclass it to add `bearer(token)` and verify chaining preserves the subclass type.

→ Solutions in `solutions.ts`.
