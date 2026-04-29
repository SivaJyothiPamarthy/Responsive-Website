// 8.1
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type _A = MyOmit<{ a: string; b: number; c: boolean }, "b">;
// { a: string; c: boolean }

// 8.2
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

type _B = Mutable<{ readonly x: number; readonly y: number }>;

// 8.3
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T];

type _T = { a: string; b?: number; c?: boolean; d: Date };
type _O = OptionalKeys<_T>;   // "b" | "c"

// 8.4
type Brand<T, B> = T & { readonly __brand: B };
type UserId = Brand<string, "UserId">;
type PostId = Brand<string, "PostId">;

const userId = (s: string) => s as UserId;
const postId = (s: string) => s as PostId;

const u = userId("u_1");
const p = postId("p_1");

// const wrong: PostId = u;   // ❌
console.log(u, p);

export {};
