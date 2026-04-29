// 6.1
function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(item => item[key]);
}

// 6.2
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> { return { ok: true, value }; }
function err<E>(error: E): Result<never, E> { return { ok: false, error }; }
function map<T, U, E>(r: Result<T, E>, fn: (v: T) => U): Result<U, E> {
  return r.ok ? ok(fn(r.value)) : r;
}

// 6.3
class EventEmitter<EventMap extends Record<string, unknown[]>> {
  private handlers: { [K in keyof EventMap]?: Array<(...args: EventMap[K]) => void> } = {};

  on<K extends keyof EventMap>(event: K, handler: (...args: EventMap[K]) => void): void {
    (this.handlers[event] ??= []).push(handler);
  }
  emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): void {
    this.handlers[event]?.forEach(h => h(...args));
  }
}

// usage
type AppEvents = {
  login:  [user: string];
  logout: [];
  error:  [code: number, message: string];
};

const bus = new EventEmitter<AppEvents>();
bus.on("login", (u) => console.log(`hello ${u}`));
bus.on("error", (code, msg) => console.error(code, msg));
bus.emit("login", "ada");
bus.emit("error", 500, "oops");
// bus.emit("login", 42);  // ❌

console.log(pluck([{id:1,name:"a"},{id:2,name:"b"}], "name"));
console.log(map(ok(2), n => n * 10));

export {};
