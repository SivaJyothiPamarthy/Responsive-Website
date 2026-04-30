# Module 12 — Capstone Project: Typed Task CLI

You'll build a small but **end-to-end TypeScript** application: a command-line task manager. It exercises everything you learned:

- Strict tsconfig (Module 11)
- Discriminated unions, narrowing, exhaustive `never` (Module 3, 7)
- Generics + `Result` (Module 6)
- Classes with `#private` + parameter properties (Module 5)
- Branded types (Module 8)
- Mapped & template literal types for command parsing (Modules 7–8)
- Modules + barrel index (Module 9)
- A method decorator for command logging (Module 10)

## Scope

```
$ tasks add "Buy milk" --priority high
✓ Added task #1: Buy milk (high)

$ tasks list
1 [ ] Buy milk         (high,  2026-04-29)

$ tasks done 1
✓ Marked task #1 as done

$ tasks list --status done
1 [x] Buy milk         (high,  2026-04-29)

$ tasks remove 1
✓ Removed task #1
```

Persistence: a JSON file at `~/.tasks.json`.

## Architecture

```
src/
├── types.ts         ← TaskId, Task, Priority, Status, Result, command type map
├── store.ts         ← class TaskStore — load/save/CRUD
├── parse.ts         ← argv → typed Command discriminated union
├── commands.ts      ← per-command handlers (typed exhaustively)
├── log.ts           ← @log decorator
├── cli.ts           ← entry point
└── index.ts         ← barrel
```

## Steps

1. **Read** `src/types.ts` — every type you'd want lives here.
2. **Read** `src/store.ts` — class + `Result<T,E>` + `#private`.
3. **Read** `src/parse.ts` — exhaustive command parsing.
4. **Read** `src/commands.ts` — switch on the discriminator, returns a `Result`.
5. **Run it**:

   ```bash
   cd typescript-course/12-capstone-project/project
   npm install
   npm run build
   node dist/cli.js add "Buy milk" --priority high
   node dist/cli.js list
   ```

6. **Stretch goals** at the bottom of this file.

## What you should be able to explain after this

- Why `Result<T,E>` is preferable to throwing for *expected* failures.
- How `Command` (discriminated union) makes `parse` total and `run` exhaustive.
- Why `TaskId = number & { __brand: "TaskId" }` prevents passing a raw number where an id is expected.
- Why `assertExhaustive: never` catches new variants at compile time.

## Stretch goals

1. Add a `--due <YYYY-MM-DD>` flag, with template literal validation.
2. Add `tasks search "<text>"` using `Array.prototype.filter`.
3. Add a `--json` flag that prints structured JSON (with a typed shape).
4. Replace `console.log` with a tiny `Logger` interface and inject it into `TaskStore`.
5. Add a TC39 `@time` decorator to every command handler (Module 10).

The example code in `project/` is a runnable starting point. Read it, break it, extend it. That's how you graduate.
