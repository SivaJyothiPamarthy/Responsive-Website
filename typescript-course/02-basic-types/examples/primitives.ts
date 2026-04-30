// Primitives & inference
const userName: string = "ada";
const age = 36;                  // inferred number
const active = true;              // inferred boolean
const big: bigint = 9_007_199_254_740_993n;
const id: symbol = Symbol("user");

// Arrays vs tuples
const tags: string[] = ["ts", "course"];
const point: [number, number] = [10, 20];

// Optional tuple member
type Maybe2D = [number, number?];
const a: Maybe2D = [1];
const b: Maybe2D = [1, 2];

console.log({ userName, age, active, big, id, tags, point, a, b });

export {};
