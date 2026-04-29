import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { type Task, type TaskId, taskId, type Priority, type Status } from "./types.js";

const FILE = join(homedir(), ".tasks.json");

interface FileShape {
  nextId: number;
  tasks: Task[];
}

export class TaskStore {
  #data: FileShape = { nextId: 1, tasks: [] };

  async load(): Promise<void> {
    if (!existsSync(FILE)) return;
    const text = await readFile(FILE, "utf8");
    this.#data = JSON.parse(text) as FileShape;
  }

  async save(): Promise<void> {
    await writeFile(FILE, JSON.stringify(this.#data, null, 2), "utf8");
  }

  list(filter?: { status?: Status }): readonly Task[] {
    if (!filter?.status) return this.#data.tasks;
    return this.#data.tasks.filter((t) => t.status === filter.status);
  }

  add(title: string, priority: Priority): Task {
    const id = taskId(this.#data.nextId++);
    const task: Task = {
      id,
      title,
      priority,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    this.#data.tasks.push(task);
    return task;
  }

  done(id: TaskId): Task | undefined {
    const t = this.#data.tasks.find((t) => t.id === id);
    if (t) t.status = "done";
    return t;
  }

  remove(id: TaskId): boolean {
    const before = this.#data.tasks.length;
    this.#data.tasks = this.#data.tasks.filter((t) => t.id !== id);
    return this.#data.tasks.length < before;
  }
}
