# TypeScript: Zero to Hero

A complete, hands-on TypeScript course built around the official TypeScript Handbook (v2). It takes you from "what is TypeScript?" all the way to advanced type-level programming, decorators, configuration, and a capstone project.

> Reference: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## Who is this course for?

- JavaScript developers who want type safety, better tooling, and confidence at scale.
- Backend or frontend engineers picking up Angular, Nest, Next.js, Deno, Bun, or React with strict types.
- Self-taught coders who want one place that goes from primitives to mapped/conditional types.

**Prerequisites**: working knowledge of modern JavaScript (ES2015+), familiarity with `npm` / `node`, and a code editor (VS Code recommended).

---

## How the course is organized

Each module is a folder containing three subfolders:

```
NN-topic/
├── lesson/        ← Read this first. Conceptual explanation + code snippets.
├── examples/      ← Runnable .ts files demonstrating the lesson.
└── exercises/     ← Tasks for you, with solutions in solutions.ts.
```

You can run any `.ts` example with:

```bash
npx tsc examples/file.ts && node examples/file.js
# or
npx ts-node examples/file.ts
```

For interactive experimentation, use the [TypeScript Playground](https://www.typescriptlang.org/play).

---

## Curriculum

| #  | Module                                    | What you'll learn                                                                 |
|----|-------------------------------------------|-----------------------------------------------------------------------------------|
| 01 | [Introduction & Setup](./01-introduction)        | What/why TypeScript, install, first compile, editor tips, the type system mindset.        |
| 02 | [Basic Types](./02-basic-types)                  | Primitives, arrays, tuples, `any` / `unknown` / `never`, literal types, enums, type aliases. |
| 03 | [Variables, Functions & Narrowing](./03-narrowing-functions) | `let`/`const`, function types, optional/default/rest params, overloads, type guards, narrowing. |
| 04 | [Object Types & Interfaces](./04-object-types)   | Interfaces, type aliases for objects, optional/readonly, index signatures, extending, intersection. |
| 05 | [Classes](./05-classes)                          | Class fields, constructors, access modifiers, abstract, static, parameter properties, this types. |
| 06 | [Generics](./06-generics)                        | Generic functions, classes, constraints, default type params, generic guards.            |
| 07 | [Advanced Types](./07-advanced-types)            | Union & intersection deep dive, discriminated unions, `keyof`, `typeof`, indexed access, template literal types. |
| 08 | [Utility, Mapped & Conditional Types](./08-utility-types) | `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `ReturnType`, mapped & conditional types. |
| 09 | [Modules](./09-modules)                          | ES modules in TS, `import`/`export`, ambient modules, declaration files (`.d.ts`), `namespace`. |
| 10 | [Decorators](./10-decorators)                    | Class, method, accessor, property, parameter decorators; metadata; the new ES decorators. |
| 11 | [tsconfig & Tooling](./11-tsconfig)              | `tsconfig.json`, strict mode, `target` / `module` / `lib`, project references, monorepos. |
| 12 | [Capstone Project](./12-capstone-project)        | Build a fully-typed CLI Task Manager using everything you learned.                       |

---

## Learning path

```
01 → 02 → 03 → 04 → 05 → 06 ─┐
                              ├→ 07 → 08 → 11 → 12
                  09 ─────────┤
                  10 ─────────┘
```

You can skim 09/10/11 once and refer back as needed; modules 01–08 are sequential.

---

## A note on TypeScript versions

This course targets **TypeScript 5.x**. Where syntax differs from older versions (`unknown`, the new ES decorators, `satisfies`, `const` type parameters, `using` declarations), the lesson calls it out.

Install the version used by the course examples:

```bash
npm i -D typescript@^5
npx tsc --version
```

---

## How to study

1. Read the `lesson/README.md` of a module.
2. Open `examples/` and run them.
3. Try the `exercises/` *without* peeking at the solutions.
4. Compare your answer to `solutions.ts`.
5. Move on once you can solve the exercise from a blank file.

The capstone in module 12 ties it all together — don't skip it.

Happy typing. 🦾
