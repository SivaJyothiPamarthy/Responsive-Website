// Module 1 - Hello, TypeScript
// Run with: npx ts-node hello.ts   (or)   npx tsc hello.ts && node hello.js

function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("world"));

// Uncomment the next line to see a compile-time error:
// console.log(greet(42));

// Inference in action — `message` is inferred as string.
const message = greet("TypeScript");
console.log(message.toUpperCase());

export {};
