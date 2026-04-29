# Module 6 — Exercises

## 6.1 `pluck`

Implement `pluck<T, K extends keyof T>(arr: T[], key: K): T[K][]`. Example:

```ts
pluck([{id:1,name:"a"}, {id:2,name:"b"}], "name"); // ["a","b"]
```

## 6.2 `Result` helpers

Given `type Result<T,E> = { ok: true; value: T } | { ok: false; error: E }`, implement:
- `ok<T>(value: T): Result<T, never>`
- `err<E>(error: E): Result<never, E>`
- `map<T,U,E>(r: Result<T,E>, fn: (v: T) => U): Result<U,E>`

## 6.3 Typed event emitter

Build `class EventEmitter<EventMap extends Record<string, unknown[]>>` with:
- `on<K extends keyof EventMap>(event: K, handler: (...args: EventMap[K]) => void)`
- `emit<K extends keyof EventMap>(event: K, ...args: EventMap[K])`

Verify that `emit("login", "ada")` is type-checked against `EventMap["login"]`.

→ Solutions in `solutions.ts`.
