// Generic functions

function first<T>(xs: T[]): T | undefined { return xs[0]; }
function zip<A, B>(as: A[], bs: B[]): Array<[A, B]> {
  return as.map((a, i) => [a, bs[i]]);
}
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

// Generic class
class Stack<T> {
  private items: T[] = [];
  push(item: T) { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  get size() { return this.items.length; }
}

// keyof + T[K]
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const u = { id: 1, name: "ada" };
console.log(first([1, 2, 3]));
console.log(zip(["a","b"], [1,2]));
console.log(longest("alpha", "beta"));

const s = new Stack<number>();
s.push(1); s.push(2); console.log(s.pop(), s.size);

console.log(getProp(u, "name"));

export {};
