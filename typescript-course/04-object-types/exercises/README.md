# Module 4 — Exercises

## 4.1 Build a `BlogPost`

Define an `interface BlogPost` with:
- `id: number` (readonly)
- `title: string`
- `body: string`
- `tags: readonly string[]`
- `publishedAt?: Date`

Then write `function publish(p: BlogPost): BlogPost` that returns a new post with `publishedAt = new Date()`. Don't mutate the input.

## 4.2 `interface` merging

In two separate code blocks (or files), declare:

```ts
interface Window { app: { name: string } }
// elsewhere…
interface Window { app: { name: string; version: string } }
```

What is the merged type? Try assigning `window.app = { name: "x" }` — does it compile?

## 4.3 Recursive comment thread

Model a `CommentNode` with `id`, `text`, and a `replies: CommentNode[]` (we avoid the name `Comment` so it doesn't shadow the DOM lib's `Comment`). Then write `function countAll(root: CommentNode): number` that returns the total number of comments in the tree.

→ Solutions in `solutions.ts`.
