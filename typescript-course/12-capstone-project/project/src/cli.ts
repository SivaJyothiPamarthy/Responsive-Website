#!/usr/bin/env node
import { parse } from "./parse.js";
import { TaskStore } from "./store.js";
import { Commands } from "./commands.js";

async function main() {
  const argv = process.argv.slice(2);
  const parsed = parse(argv);
  if (!parsed.ok) {
    console.error(`Error: ${parsed.error}`);
    process.exit(2);
  }

  const store = new TaskStore();
  await store.load();

  const commands = new Commands(store);
  const output = await commands.run(parsed.value);
  console.log(output);
}

main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
