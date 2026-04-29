# Module 11 — Exercises

## 11.1 Strictness sweep

Take an existing JS/TS project. Turn on:

```jsonc
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitOverride": true
}
```

Fix every compiler error *without* using `any` or `as`.

## 11.2 Pick the right module setting

For each scenario, choose `NodeNext`, `Bundler`, or `ESNext` and explain why:

1. Publishing a Node.js library to npm.
2. A Vite + React app.
3. A Cloudflare Worker built with esbuild.

## 11.3 Project references

Set up two-package monorepo:
- `packages/core` exports a `User` type and a `format` function.
- `packages/web` imports them.

Use `composite: true` and build with `tsc -b`.

→ No solutions file: 11.1 is project-specific, 11.2 is in the lesson, 11.3 follows the example pattern.
