// Conditional types and `infer`

type ReturnTypeOf<F> = F extends (...args: any[]) => infer R ? R : never;
type ElementOf<T>    = T extends Array<infer U> ? U : never;
type ParamsOf<F>     = F extends (...args: infer P) => any ? P : never;

type R1 = ReturnTypeOf<() => string>;             // string
type R2 = ElementOf<Array<{ id: number }>>;       // { id: number }
type R3 = ParamsOf<(a: number, b: string) => 0>;  // [number, string]

// Distribution over unions
type Boxed<T> = T extends unknown ? { value: T } : never;
type B = Boxed<string | number>;
// { value: string } | { value: number }

const _r1: R1 = "hi";
const _r2: R2 = { id: 1 };
const _r3: R3 = [1, "x"];
const _b: B = { value: 1 };
console.log(_r1, _r2, _r3, _b);

export {};
