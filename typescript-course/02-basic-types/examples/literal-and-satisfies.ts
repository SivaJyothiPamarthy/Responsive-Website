// Literal unions are the modern "enum" most of the time.
type LogLevel = "debug" | "info" | "warn" | "error";

function log(level: LogLevel, msg: string) {
  console.log(`[${level.toUpperCase()}] ${msg}`);
}

log("info", "ready");
// log("trace", "nope"); // ❌

// `satisfies` keeps narrow inference while validating shape.
type Palette = Record<"red" | "green" | "blue", string | [number, number, number]>;

const palette = {
  red:   [255, 0, 0],
  green: "#00ff00",
  blue:  [0, 0, 255],
} satisfies Palette;

const r0: number = palette.red[0];      // inference preserved
const g: string = palette.green;        // string, not string | [number, number, number]
console.log(r0, g);

export {};
