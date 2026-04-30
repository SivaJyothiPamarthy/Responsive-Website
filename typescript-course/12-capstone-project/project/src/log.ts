// TC39 method decorator that logs invocation + duration.

export function log(method: Function, ctx: ClassMethodDecoratorContext) {
  return function (this: unknown, ...args: unknown[]) {
    const t0 = performance.now();
    try {
      return (method as (...a: unknown[]) => unknown).apply(this, args);
    } finally {
      const dt = (performance.now() - t0).toFixed(1);
      // eslint-disable-next-line no-console
      console.error(`· ${String(ctx.name)} (${dt} ms)`);
    }
  };
}
