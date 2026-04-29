// 3.1
function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function loudly(input: unknown): string {
  if (!isNonEmptyString(input)) throw new Error("expected non-empty string");
  return input.toUpperCase();
}

// 3.2
type Result<T> =
  | { ok: true;  value: T }
  | { ok: false; error: string };

function unwrap<T>(r: Result<T>): T {
  if (r.ok) return r.value;
  throw new Error(r.error);
}

// 3.3
type Event =
  | { type: "click";    x: number; y: number }
  | { type: "scroll";   delta: number }
  | { type: "keypress"; key: string };

function summarize(e: Event): string {
  switch (e.type) {
    case "click":    return `click @ ${e.x},${e.y}`;
    case "scroll":   return `scroll ${e.delta}`;
    case "keypress": return `key ${e.key}`;
    default: {
      const _exhaustive: never = e;
      return _exhaustive;
    }
  }
}

// 3.4
// Overloads:
function parse(input: string): unknown;
function parse(input: string, asNumber: true): number;
function parse(input: string, asNumber?: true): unknown {
  return asNumber ? Number(input) : JSON.parse(input);
}

// Union version (less ergonomic for callers — they get unknown|number always):
function parseUnion(input: string, asNumber: boolean): unknown | number {
  return asNumber ? Number(input) : JSON.parse(input);
}

// Overloads win here because callers get a precise return type per call shape.
console.log(parse("42", true).toFixed(2)); // ✅ number

export {};
