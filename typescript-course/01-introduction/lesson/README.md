# Module 1 — Introduction & Setup

## 1.1 What is TypeScript?

TypeScript is a **strongly-typed superset of JavaScript** that compiles to plain JavaScript. Anything legal in JavaScript is legal in TypeScript — but TypeScript adds an optional, structural type system that catches mistakes *before* the code runs.

> Official summary: "TypeScript is JavaScript with syntax for types."
> — <https://www.typescriptlang.org>

A few key ideas:

- **Static typing** — types are checked at compile time, not at runtime.
- **Erased at runtime** — types vanish after compilation; the output is normal JS.
- **Structural** — two types are compatible if their *shapes* match, regardless of name.
- **Inferred** — you usually don't need to write types; TS figures them out.

## 1.2 Why use it?

| Pain in plain JS                                 | What TypeScript gives you                                  |
|--------------------------------------------------|------------------------------------------------------------|
| `Cannot read property 'x' of undefined`          | The compiler refuses to let you read `x` from `undefined`. |
| Calling a function with the wrong arg            | Type error at compile time.                                |
| Renaming a field across 50 files                 | The compiler lists every callsite that broke.              |
| "What does this function return again?"          | Hover in the editor → full type signature.                 |
| Refactoring without breaking subtle invariants   | Types document and enforce invariants for you.             |

## 1.3 How TypeScript works (the mental model)

```
┌──────────────┐   tsc    ┌──────────────┐
│  .ts source  │ ───────► │   .js source │ ──► Node / Browser
└──────────────┘ + checks └──────────────┘
       │
       └─► editor uses the same compiler API for IntelliSense
```

There are **two outputs** from `tsc`:

1. **Diagnostic messages** (the value of TypeScript) — type errors.
2. **Emitted JavaScript** (mostly type-stripping + downleveling).

Even if your code has type errors, `tsc` will *still emit JS by default*. The errors are guidance; you ship JS.

## 1.4 Install

You need Node.js ≥ 18.

```bash
# globally (handy for scratch work)
npm install -g typescript

# per-project (preferred)
mkdir hello-ts && cd hello-ts
npm init -y
npm install -D typescript @types/node
npx tsc --init   # creates tsconfig.json
```

Verify:

```bash
npx tsc --version   # → Version 5.x.x
```

## 1.5 Your first TypeScript file

Create `hello.ts`:

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("world"));
// Try changing the argument to greet(42) — TypeScript will complain.
```

Compile and run:

```bash
npx tsc hello.ts          # produces hello.js
node hello.js             # → Hello, world!
```

Or run directly without an emit step:

```bash
npx ts-node hello.ts      # if you `npm i -D ts-node`
# or with Node 22.6+:
node --experimental-strip-types hello.ts
```

## 1.6 Editor experience

VS Code ships with TypeScript support out of the box. The two settings that matter most:

- **Use Workspace Version of TypeScript** — pin the editor to your project's installed `typescript` (Cmd/Ctrl-Shift-P → "TypeScript: Select TypeScript Version").
- **Hover & "Go to Definition"** — these are the productivity superpowers. Get used to them.

## 1.7 The "type system mindset"

Three rules to internalize before module 2:

1. **Let inference do the work.** Don't annotate everything. Annotate boundaries (function parameters, exported APIs).
2. **Make illegal states unrepresentable.** If a value can be `string | null`, model that — never lie with `as string`.
3. **Errors are good news.** Every red squiggle is a bug the compiler caught for you.

---

## ✅ Checklist

- [ ] You can run `npx tsc --version` and see 5.x.
- [ ] You compiled and ran `hello.ts`.
- [ ] You triggered a type error on purpose.

→ Continue to **[Module 2 — Basic Types](../../02-basic-types/lesson/README.md)**
