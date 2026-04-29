// 10.1 — @time
function time(method: Function, ctx: ClassMethodDecoratorContext) {
  return function (this: any, ...args: any[]) {
    const t0 = performance.now();
    try { return (method as any).apply(this, args); }
    finally {
      const dt = performance.now() - t0;
      console.log(`[time] ${String(ctx.name)} took ${dt.toFixed(2)} ms`);
    }
  };
}

// 10.2 — @deprecated(message)
function deprecated(message: string) {
  return function (method: Function, ctx: ClassMethodDecoratorContext) {
    let warned = false;
    return function (this: any, ...args: any[]) {
      if (!warned) {
        warned = true;
        console.warn(`[deprecated] ${String(ctx.name)}: ${message}`);
      }
      return (method as any).apply(this, args);
    };
  };
}

// 10.3 — @autobind
function autobind<T extends new (...args: any[]) => any>(
  Value: T,
  _ctx: ClassDecoratorContext,
): T {
  return class extends Value {
    constructor(...args: any[]) {
      super(...args);
      const proto = Object.getPrototypeOf(this);
      for (const name of Object.getOwnPropertyNames(proto)) {
        if (name === "constructor") continue;
        const v = (this as any)[name];
        if (typeof v === "function") (this as any)[name] = v.bind(this);
      }
    }
  };
}

@autobind
class Demo {
  greeting = "hi";
  @time say() { return `${this.greeting} ada`; }
  @deprecated("use say instead") legacySay() { return this.say(); }
}

const d = new Demo();
const detached = d.say;       // still works because of @autobind
console.log(detached());
d.legacySay();
d.legacySay();                 // no warning the second time

export {};
