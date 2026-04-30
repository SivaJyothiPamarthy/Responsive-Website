// Narrowing strategies

// typeof
function pad(value: string | number, width: number): string {
  if (typeof value === "number") {
    return value.toString().padStart(width, "0");
  }
  return value.padStart(width, " ");
}

// in
type Fish = { name: string; swim: () => void };
type Bird = { name: string; fly:  () => void };
function move(animal: Fish | Bird): void {
  if ("swim" in animal) animal.swim();
  else                   animal.fly();
}

// User-defined guard
function isString(v: unknown): v is string {
  return typeof v === "string";
}

// Discriminated union with exhaustive `never`
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side:   number }
  | { kind: "rect";   w: number; h: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side ** 2;
    case "rect":   return s.w * s.h;
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}

console.log(pad("hi", 5));
console.log(pad(42, 5));
console.log(isString("hi"), isString(1));
console.log(area({ kind: "circle", radius: 2 }));

export {};
