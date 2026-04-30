# Module 11 — `tsconfig.json` & Tooling

> Reference: [TSConfig Reference](https://www.typescriptlang.org/tsconfig)

`tsconfig.json` is the blueprint for how `tsc` (and your editor) interpret your code. Get it right once, and everything downstream — IntelliSense, builds, lint — gets faster and stricter.

## 11.1 The minimal recommended config

For a Node 20+ library:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],

    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,

    "outDir": "dist",
    "rootDir": "src",

    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

For a Vite/React frontend:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

## 11.2 Settings worth caring about

### Strictness (turn them all on)

| Flag                              | Why it matters                                                       |
|-----------------------------------|-----------------------------------------------------------------------|
| `strict`                          | Master switch. Enables 8+ flags. *Always on*.                        |
| `noUncheckedIndexedAccess`        | `arr[i]` becomes `T \| undefined` — forces you to handle gaps.       |
| `noImplicitOverride`              | Override a method? You must say `override`.                          |
| `exactOptionalPropertyTypes`      | `{ x?: number }` won't accept `{ x: undefined }`.                    |
| `noFallthroughCasesInSwitch`      | Catch missing `break`s.                                              |
| `noImplicitReturns`               | All branches must return.                                            |

### Output

| Flag                     | Meaning                                               |
|--------------------------|-------------------------------------------------------|
| `target`                 | JS version to emit (ES2022 is a sweet spot).          |
| `module`                 | Module format (`NodeNext` for Node, `ESNext` for bundlers). |
| `outDir`, `rootDir`      | Where outputs go / where sources live.                |
| `declaration`            | Emit `.d.ts` files (libraries).                       |
| `declarationMap`         | "Go to definition" jumps into source, not `.d.ts`.    |
| `sourceMap`              | Debugger maps emitted JS back to TS.                  |
| `noEmit`                 | Don't emit at all (delegate to bundler).              |

### Module resolution

| Flag                     | Meaning                                                 |
|--------------------------|----------------------------------------------------------|
| `moduleResolution`       | `NodeNext` (strict ESM) or `Bundler` (Vite/esbuild).     |
| `paths`, `baseUrl`       | Path aliases (also configure in your runtime).          |
| `esModuleInterop`        | Make `import x from 'cjs-thing'` work nicely.            |
| `verbatimModuleSyntax`   | Emit imports/exports exactly as written; required for ESM-only stacks. |
| `isolatedModules`        | File-by-file transpilation safety (Babel/swc/esbuild).   |
| `skipLibCheck`           | Skip type-checking inside `node_modules` for speed.      |

## 11.3 `include`, `exclude`, `files`

```jsonc
{
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts"],
  "files":   ["src/main.ts"]
}
```

`files` is exact, `include`/`exclude` are globs. If you have neither, TS picks up all `.ts` files under the config dir.

## 11.4 Project references (monorepos)

Build large projects as a graph of smaller ones:

```jsonc
// repo/tsconfig.json
{
  "files": [],
  "references": [
    { "path": "packages/core" },
    { "path": "packages/web" }
  ]
}
```

```jsonc
// packages/core/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "dist",
    "declaration": true
  },
  "include": ["src"]
}
```

Build with `tsc -b`. TS only rebuilds what changed, downstream-aware.

## 11.5 Editor + CI tooling

A typical TS toolchain:

| Tool                | Job                                                |
|---------------------|----------------------------------------------------|
| `tsc --noEmit`      | Type-check in CI; the source of truth.             |
| `eslint` + `@typescript-eslint` | Lint for style and TS-aware rules.     |
| `prettier`          | Code formatting.                                   |
| `tsx` / `ts-node`   | Run `.ts` files in dev.                            |
| `tsup` / `tsc -b`   | Build/publish a library.                           |
| `vitest` / `jest`   | Tests; both type-check via `tsc` separately.       |

`package.json` scripts that scale:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build":     "tsc -b",
    "lint":      "eslint .",
    "test":      "vitest run",
    "ci":        "npm run typecheck && npm run lint && npm test"
  }
}
```

## 11.6 Common pain points & fixes

- **"Cannot find module ... or its corresponding type declarations."**
  → Install `@types/<lib>`, or write a `.d.ts` (module 9), or check `moduleResolution`.
- **"Type instantiation is excessively deep."**
  → A recursive type over a large union. Add a depth bound, or memoize an intermediate alias.
- **`tsc` is slow.**
  → Turn on `skipLibCheck`. Split into project references. Use `tsc -b --incremental`.
- **`import type` errors after refactor.**
  → Enable `verbatimModuleSyntax` to force consistency.

---

## ✅ Checklist

- [ ] You enabled `strict` plus `noUncheckedIndexedAccess`.
- [ ] You picked the right `module` / `moduleResolution`.
- [ ] You added a `typecheck` npm script.
- [ ] (Monorepo) you built with `tsc -b`.

→ Continue to **[Module 12 — Capstone Project](../../12-capstone-project/lesson/README.md)**
