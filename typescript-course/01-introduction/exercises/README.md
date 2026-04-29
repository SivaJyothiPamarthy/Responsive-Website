# Module 1 — Exercises

## Exercise 1.1 — Set up a project

1. Create a new folder `my-first-ts/`.
2. Run `npm init -y` and `npm i -D typescript @types/node`.
3. Run `npx tsc --init`.
4. Create `src/index.ts` that prints "Hello, <yourName>".
5. Compile with `npx tsc` and run with `node` (or use `ts-node`).

✅ You finish this exercise when you have a working `index.js` produced by `tsc`.

## Exercise 1.2 — Trigger a type error

In `src/index.ts`, write:

```ts
function add(a: number, b: number): number {
  return a + b;
}
add("1", 2);
```

Compile. Read the error. *Fix it without using `as any`*.

## Exercise 1.3 — Inference quiz

Without running the code, predict the inferred type of each binding:

```ts
const a = 42;
let b = 42;
const c = "hello" as const;
const d = [1, 2, 3];
const e = { ok: true };
```

Then verify by hovering each variable in your editor.

> Solutions: see `solutions.ts`.
