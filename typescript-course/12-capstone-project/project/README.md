# Tasks CLI — Capstone Project

A tiny but **end-to-end strict-TypeScript** command-line task manager. See `../lesson/README.md` for the project description and stretch goals.

## Run

```bash
npm install
npm run dev -- add "Buy milk" --priority high
npm run dev -- list
npm run dev -- done 1
npm run dev -- list --status done
npm run dev -- remove 1
```

Or build and use the compiled binary:

```bash
npm run build
node dist/cli.js list
```

Tasks persist to `~/.tasks.json`.

## Files

| File              | Module(s) it exercises               |
|-------------------|---------------------------------------|
| `src/types.ts`    | 2, 3 (DUs), 6 (`Result`), 8 (brand)  |
| `src/store.ts`    | 5 (`#private`, params), 6, 9          |
| `src/parse.ts`    | 3 (narrowing), 6 (`Result`)           |
| `src/commands.ts` | 3 (exhaustive `never`), 5, 9          |
| `src/log.ts`      | 10 (TC39 decorator)                   |
| `src/cli.ts`      | 9 (entry & barrels)                   |
| `tsconfig.json`   | 11                                    |
