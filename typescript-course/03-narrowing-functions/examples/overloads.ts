// Overloads — multiple legitimate signatures for the same function.

function len(s: string): number;
function len(arr: unknown[]): number;
function len(x: string | unknown[]): number {
  return x.length;
}

console.log(len("hello"));
console.log(len([1, 2, 3, 4]));
// console.log(len(123)); // ❌ no matching overload

export {};
