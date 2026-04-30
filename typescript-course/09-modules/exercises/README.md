# Module 9 — Exercises

## 9.1 Type-only imports

Refactor a file that imports both a `User` type and a `getUser` function so the type import is `import type`. Confirm it disappears from the emitted `.js`.

## 9.2 Build a barrel

Create `src/services/{auth,users,posts}.ts` each exporting at least one function. Add `src/services/index.ts` that re-exports them. Then import `import { login } from "./services"` from elsewhere.

## 9.3 Declare an untyped lib

Pretend you depend on a library `tiny-cache` with no types. Write `tiny-cache.d.ts`:

```ts
declare module "tiny-cache" {
  export function set<K extends string, V>(k: K, v: V): void;
  export function get<V = unknown>(k: string): V | undefined;
}
```

Import it and verify the calls type-check.

## 9.4 Path alias setup

Add `"@/*": ["src/*"]` to `tsconfig.json`. Update an import to use `@/services`. Run `tsc --noEmit` to confirm.

→ No solutions file — these are setup exercises. The module's `examples/` shows the patterns.
