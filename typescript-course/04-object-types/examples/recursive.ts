// Recursive / self-referential types

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };

const sample: JsonValue = {
  ok: true,
  count: 3,
  items: ["a", "b", { nested: [1, null, false] }],
};

interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

const tree: TreeNode<string> = {
  value: "root",
  children: [
    { value: "child-1", children: [] },
    { value: "child-2", children: [{ value: "grand", children: [] }] },
  ],
};

console.log(JSON.stringify(sample));
console.log(tree);

export {};
