# Module 9 — Modules

> Reference: [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)

TypeScript uses **ECMAScript modules** (`import` / `export`). The compiler can also emit CommonJS, AMD, UMD, etc., but you should write ESM source.

## 9.1 Files are modules

Any file with a top-level `import` or `export` is a module. Otherwise it's treated as a "script" (everything is global). Add `export {};` to force-module-ify a file.

## 9.2 Named, default, namespace imports

```ts
// math.ts
export const PI = 3.14;
export function add(a: number, b: number) { return a + b; }
export default function multiply(a: number, b: number) { return a * b; }
```

```ts
// app.ts
import multiply, { PI, add } from "./math";
import * as Math2 from "./math";

console.log(multiply(2, 3), PI, add(1, 2));
console.log(Math2.PI, Math2.add(1, 2));
```

`default` is just a name for "the export named `default`" — there's nothing magical about it. **Avoid** default exports for libraries: they make refactoring & auto-import worse.

## 9.3 Type-only imports/exports

When you import only types, mark them with `type`:

```ts
import type { User } from "./user";
import { type User as U, getUser } from "./user";
```

`type`-only imports/exports are **erased completely**. They never end up in compiled JS — useful for circular reference avoidance and bundler tree-shaking.

## 9.4 Re-exports

```ts
export { add, PI } from "./math";
export * as MathUtils from "./math";
export type { User } from "./user";
```

Use a `index.ts` "barrel" to expose a clean public API of a folder.

## 9.5 Module resolution

Two main strategies:

- **`node` / `node10`** — legacy, what most TS code historically used.
- **`node16` / `nodenext`** — strict, requires explicit file extensions in imports (`./math.js`!) for ESM-emitted code.
- **`bundler`** — meant for Vite, esbuild, webpack: relaxed resolution, no extensions.

Pick `bundler` for frontends with a bundler. Pick `nodenext` for Node.js libraries.

## 9.6 Path aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"]
    }
  }
}
```

Then:

```ts
import { Button } from "@components/Button";
```

> Note: TypeScript only resolves paths during type-checking. Your bundler / Node loader must apply the same mapping at runtime (e.g. `tsconfig-paths`, Vite's resolver).

## 9.7 Ambient modules and declaration files (`.d.ts`)

A `.d.ts` file is "types only" — no runtime code. Used to:
- describe the shape of a JS library that has no types,
- declare global types,
- declare module-shaped resources (like `*.svg`, `*.css?inline`).

```ts
// global.d.ts
declare global {
  interface Window { __APP_VERSION__: string }
}
export {};

// images.d.ts
declare module "*.svg" {
  const src: string;
  export default src;
}
```

Use `declare module "some-untyped-lib"` to give a third-party lib a *minimal* shape so you can use it without `any`.

## 9.8 Namespaces (legacy, but still appear)

Pre-ESM, TS used `namespace`:

```ts
namespace Geom {
  export const PI = 3.14;
  export function area(r: number) { return PI * r * r; }
}
Geom.area(2);
```

Modern code: prefer files + `import`. Namespaces are still useful for declaration merging, e.g. `class + namespace` to attach static-like helpers.

## 9.9 Triple-slash directives

```ts
/// <reference path="./extra-types.d.ts" />
/// <reference types="node" />
```

Mostly for declaration files. You won't write these in app code often.

---

## ✅ Checklist

- [ ] You used `import type`.
- [ ] You created a barrel `index.ts`.
- [ ] You declared a `.d.ts` for an untyped resource.
- [ ] You set up `paths` aliases.

→ Continue to **[Module 10 — Decorators](../../10-decorators/lesson/README.md)**
