# Module 10 — Decorators

> References: [Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), [TC39 Decorators](https://github.com/tc39/proposal-decorators)

There are **two flavors** of decorators in the TypeScript world:

1. **Stage-3 / TC39 Decorators** (TS 5.0+) — the new, ECMAScript-aligned form. Enabled by default.
2. **Legacy / experimental decorators** — the older form, used by Angular, NestJS, TypeORM. Enabled with `"experimentalDecorators": true`.

The two are *not* interchangeable. Below, both are covered.

## 10.1 The new (TC39) decorators

These are the ones you should be writing in fresh projects.

### Class decorator

```ts
function logged<T extends new (...args: any[]) => any>(
  Value: T,
  context: ClassDecoratorContext
): T {
  console.log(`@logged on ${String(context.name)}`);
  return Value;
}

@logged
class MyService {
  doWork() { console.log("working"); }
}
```

A class decorator receives the class **value** and a `context` carrying metadata. Returning a new class replaces the original.

### Method decorator

```ts
function bound(value: Function, context: ClassMethodDecoratorContext) {
  context.addInitializer(function (this: any) {
    this[context.name] = (this[context.name] as Function).bind(this);
  });
}

class Counter {
  count = 0;
  @bound increment() { this.count++; }
}
```

`addInitializer` runs after construction, with `this` bound to the instance — perfect for binding methods.

### Field decorator

```ts
function trace(value: undefined, context: ClassFieldDecoratorContext) {
  return function initializer(initial: unknown) {
    console.log(`init ${String(context.name)} =`, initial);
    return initial;
  };
}

class C {
  @trace name = "default";
}
```

Field decorators return a function that wraps the *initializer*.

### Accessor decorator

```ts
function uppercase<T extends string>(value: any, ctx: ClassAccessorDecoratorContext<unknown, T>) {
  return {
    get(this: unknown) { return value.get.call(this).toUpperCase(); },
    set(this: unknown, v: T) { value.set.call(this, v); },
  };
}

class Person { @uppercase accessor name = "ada"; }
new Person().name;   // "ADA"
```

Note `accessor name` — the new built-in shorthand for an auto-implemented getter/setter pair.

## 10.2 Legacy decorators (Angular / Nest / TypeORM)

```jsonc
// tsconfig.json
{ "experimentalDecorators": true, "emitDecoratorMetadata": true }
```

```ts
function Log(target: any, key: string, desc: PropertyDescriptor) {
  const original = desc.value;
  desc.value = function (...args: any[]) {
    console.log(`call ${key}`, args);
    return original.apply(this, args);
  };
}

class Calc {
  @Log
  add(a: number, b: number) { return a + b; }
}
```

Differences from the new ones:
- Method decorators receive `(target, key, descriptor)` and *mutate* the descriptor.
- Class decorators receive the constructor.
- `emitDecoratorMetadata` makes TS emit `Reflect` metadata that frameworks like Nest use for DI.

## 10.3 Where you'll see decorators

| Framework | Use case                                     |
|-----------|----------------------------------------------|
| Angular   | `@Component`, `@Injectable`, `@Input`        |
| NestJS    | `@Controller`, `@Get`, `@Body`, `@Module`    |
| TypeORM   | `@Entity`, `@Column`, `@PrimaryColumn`       |
| MobX      | `@observable`, `@action`                     |
| class-validator | `@IsEmail`, `@MinLength`               |

## 10.4 Decorator factories

A decorator that takes arguments is just a function that *returns* a decorator:

```ts
function maxRetries(n: number) {
  return function (
    method: Function,
    ctx: ClassMethodDecoratorContext
  ) {
    return async function (this: any, ...args: any[]) {
      for (let i = 0; i < n; i++) {
        try { return await (method as any).apply(this, args); }
        catch (e) { if (i === n - 1) throw e; }
      }
    };
  };
}

class Api {
  @maxRetries(3)
  async fetchUser(id: string) { /* ... */ }
}
```

## 10.5 When *not* to use decorators

- Adding "logging" to a function — just call a wrapper.
- Anything that obscures control flow.
- Cross-cutting concerns better served by middleware/HOFs.

Decorators are great for **declarative, framework-driven** code (DI, ORM, route registration). Otherwise, prefer plain functions and HOFs.

---

## ✅ Checklist

- [ ] You wrote a TC39 method decorator.
- [ ] You wrote a class decorator.
- [ ] You used a decorator factory.
- [ ] You enabled `experimentalDecorators` *only* if needed.

→ Continue to **[Module 11 — tsconfig & Tooling](../../11-tsconfig/lesson/README.md)**
