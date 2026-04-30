// Custom mapped & conditional types

// Build your own Partial / Required / Readonly
type MyPartial<T>  = { [K in keyof T]?: T[K] };
type MyRequired<T> = { [K in keyof T]-?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

// Drop function keys
type DataOnly<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

class User {
  id = 0;
  name = "";
  greet() { return `hi ${this.name}`; }
}

type UserData = DataOnly<User>;
// { id: number; name: string }

// Branded ids
type Brand<T, B> = T & { readonly __brand: B };
type UserId  = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

const u = "u_1" as UserId;
// const o: OrderId = u;  // ❌

const data: UserData = { id: 1, name: "ada" };
console.log(data, u);

export {};
