// 1.1 - sample solution
function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Alice"));

// 1.2 - the fix is to pass numbers, not a string
function add(a: number, b: number): number {
  return a + b;
}
add(1, 2);

// 1.3 - inference quiz answers
//   const a = 42;            → 42  (literal type, because `const`)
//   let   b = 42;            → number (widened, because `let`)
//   const c = "hello" as const; → "hello"
//   const d = [1, 2, 3];     → number[]
//   const e = { ok: true };  → { ok: boolean }

export {};
