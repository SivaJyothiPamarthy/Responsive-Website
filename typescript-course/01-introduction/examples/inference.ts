// Demonstrates how TypeScript infers types without explicit annotations.

const port = 3000;          // inferred: number
const name = "ts";          // inferred: string (literal "ts" if `const`)
const flags = ["a", "b"];   // inferred: string[]

const config = {
  port,
  name,
  flags,
};
// config: { port: number; name: string; flags: string[] }

// Hover any of these in your editor to see the inferred type.
console.log(config);

export {};
