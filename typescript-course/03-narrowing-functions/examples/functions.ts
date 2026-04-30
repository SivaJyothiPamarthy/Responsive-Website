// Function basics

type BinaryOp = (a: number, b: number) => number;
const mul: BinaryOp = (a, b) => a * b;

function greet(name: string, salutation = "Hello", suffix?: string): string {
  return `${salutation}, ${name}${suffix ?? ""}`;
}

function sum(...ns: number[]): number {
  return ns.reduce((a, b) => a + b, 0);
}

console.log(mul(3, 4));
console.log(greet("Ada"));
console.log(greet("Ada", "Hi", "!"));
console.log(sum(1, 2, 3, 4));

export {};
