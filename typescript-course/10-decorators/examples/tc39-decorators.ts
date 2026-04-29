// TC39 / Stage 3 decorators (TS 5.0+, no `experimentalDecorators` needed).

function logged<T extends new (...args: any[]) => any>(
  Value: T,
  context: ClassDecoratorContext,
): T {
  console.log(`@logged on ${String(context.name)}`);
  return Value;
}

function bound(_value: Function, context: ClassMethodDecoratorContext) {
  context.addInitializer(function (this: any) {
    this[context.name] = (this[context.name] as Function).bind(this);
  });
}

function maxRetries(n: number) {
  return function (method: Function, _ctx: ClassMethodDecoratorContext) {
    return async function (this: any, ...args: any[]) {
      let lastErr: unknown;
      for (let i = 0; i < n; i++) {
        try { return await (method as any).apply(this, args); }
        catch (e) { lastErr = e; }
      }
      throw lastErr;
    };
  };
}

@logged
class Counter {
  count = 0;
  @bound increment() { this.count++; }
}

class Api {
  attempts = 0;
  @maxRetries(3)
  async flaky() {
    this.attempts++;
    if (this.attempts < 3) throw new Error("oops");
    return "ok";
  }
}

const c = new Counter();
const inc = c.increment;   // detached
inc();
console.log(c.count);

(async () => {
  const api = new Api();
  console.log(await api.flaky(), "after", api.attempts, "attempts");
})();

export {};
