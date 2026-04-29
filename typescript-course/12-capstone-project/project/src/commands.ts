import type { Command, Task } from "./types.js";
import { TaskStore } from "./store.js";

const HELP = `tasks — a tiny typed task manager

USAGE
  tasks add "<title>" [--priority low|med|high]
  tasks list [--status open|done]
  tasks done <id>
  tasks remove <id>
  tasks help
`;

function fmt(t: Task): string {
  const mark   = t.status === "done" ? "x" : " ";
  const date   = t.createdAt.slice(0, 10);
  const title  = t.title.padEnd(20);
  return `${String(t.id).padStart(3)} [${mark}] ${title} (${t.priority}, ${date})`;
}

export class Commands {
  constructor(private readonly store: TaskStore) {}

  async run(cmd: Command): Promise<string> {
    switch (cmd.kind) {
      case "help":
        return HELP;

      case "add": {
        const t = this.store.add(cmd.title, cmd.priority);
        await this.store.save();
        return `✓ Added task #${t.id}: ${t.title} (${t.priority})`;
      }

      case "list": {
        const tasks = this.store.list(cmd.status ? { status: cmd.status } : undefined);
        return tasks.length === 0
          ? "(no tasks)"
          : tasks.map(fmt).join("\n");
      }

      case "done": {
        const t = this.store.done(cmd.id);
        if (!t) return `✗ No task with id ${cmd.id}`;
        await this.store.save();
        return `✓ Marked task #${t.id} as done`;
      }

      case "remove": {
        const removed = this.store.remove(cmd.id);
        if (!removed) return `✗ No task with id ${cmd.id}`;
        await this.store.save();
        return `✓ Removed task #${cmd.id}`;
      }

      default: {
        // Exhaustiveness check — adding a new variant breaks compilation here.
        const _exhaustive: never = cmd;
        return _exhaustive;
      }
    }
  }
}
