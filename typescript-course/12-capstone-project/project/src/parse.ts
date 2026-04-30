import {
  type Command,
  type Priority,
  type Status,
  taskId,
  ok,
  err,
  type Result,
} from "./types.js";

const PRIORITIES: readonly Priority[] = ["low", "med", "high"] as const;
const STATUSES:   readonly Status[]   = ["open", "done"] as const;

function isPriority(s: string): s is Priority {
  return (PRIORITIES as readonly string[]).includes(s);
}
function isStatus(s: string): s is Status {
  return (STATUSES as readonly string[]).includes(s);
}

export function parse(argv: readonly string[]): Result<Command> {
  const [sub, ...rest] = argv;
  switch (sub) {
    case undefined:
    case "help":
    case "--help":
    case "-h":
      return ok({ kind: "help" });

    case "add": {
      // tasks add "<title>" [--priority <p>]
      const title = rest[0];
      if (!title) return err("`add` requires a title: tasks add \"<title>\"");
      let priority: Priority = "med";
      const idx = rest.indexOf("--priority");
      if (idx !== -1) {
        const p = rest[idx + 1];
        if (!p || !isPriority(p)) return err(`--priority must be one of ${PRIORITIES.join(", ")}`);
        priority = p;
      }
      return ok({ kind: "add", title, priority });
    }

    case "list": {
      const idx = rest.indexOf("--status");
      if (idx === -1) return ok({ kind: "list" });
      const s = rest[idx + 1];
      if (!s || !isStatus(s)) return err(`--status must be one of ${STATUSES.join(", ")}`);
      return ok({ kind: "list", status: s });
    }

    case "done":
    case "remove": {
      const raw = rest[0];
      if (!raw) return err(`\`${sub}\` requires an id`);
      const n = Number(raw);
      if (!Number.isInteger(n) || n <= 0) return err(`id must be a positive integer`);
      return ok({ kind: sub, id: taskId(n) });
    }

    default:
      return err(`Unknown command: ${sub}`);
  }
}
