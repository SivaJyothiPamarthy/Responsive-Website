// `unknown` forces you to narrow before use; `any` doesn't.

function parseJsonSafely(input: string): unknown {
  return JSON.parse(input);
}

const data = parseJsonSafely('{"name":"ada","age":36}');

// data.name;  // Error: Object is of type 'unknown'.

if (typeof data === "object" && data !== null && "name" in data) {
  // narrowed enough that we can read .name
  console.log((data as { name: string }).name);
}

// Compare with `any` — no checks, no safety:
const wild: any = parseJsonSafely("[]");
wild.literally.anything.goes();   // compiles, but explodes at runtime

export {};
