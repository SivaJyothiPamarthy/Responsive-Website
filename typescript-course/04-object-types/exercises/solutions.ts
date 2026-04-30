// 4.1
interface BlogPost {
  readonly id: number;
  title: string;
  body: string;
  tags: readonly string[];
  publishedAt?: Date;
}

function publish(p: BlogPost): BlogPost {
  return { ...p, publishedAt: new Date() };
}

// 4.2 — merged Window has app: { name: string; version: string }
// → assigning { name: "x" } fails because version is missing.

// 4.3
interface CommentNode {
  id: number;
  text: string;
  replies: CommentNode[];
}

function countAll(root: CommentNode): number {
  return 1 + root.replies.reduce((acc, c) => acc + countAll(c), 0);
}

const sample: CommentNode = {
  id: 1,
  text: "root",
  replies: [
    { id: 2, text: "a", replies: [] },
    { id: 3, text: "b", replies: [{ id: 4, text: "b1", replies: [] }] },
  ],
};
console.log(countAll(sample)); // 4

export {};
