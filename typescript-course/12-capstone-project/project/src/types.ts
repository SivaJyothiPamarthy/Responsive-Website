// Domain types and the Command discriminated union.

export type Brand<T, B> = T & { readonly __brand: B };
export type TaskId = Brand<number, "TaskId">;

export const taskId = (n: number) => n as TaskId;

export type Priority = "low" | "med" | "high";
export type Status   = "open" | "done";

export interface Task {
  readonly id: TaskId;
  title: string;
  priority: Priority;
  status: Status;
  createdAt: string;   // ISO date
}

export type Result<T, E = string> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

export const ok  = <T>(value: T): Result<T, never>  => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E>  => ({ ok: false, error });

// Command DU — every CLI subcommand has a *typed* shape.
export type Command =
  | { kind: "add";    title: string; priority: Priority }
  | { kind: "list";   status?: Status }
  | { kind: "done";   id: TaskId }
  | { kind: "remove"; id: TaskId }
  | { kind: "help" };
