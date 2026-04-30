# Module 5 — Classes

> Reference: [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

TypeScript classes are JavaScript classes with type annotations + a few extra features (access modifiers, abstract, parameter properties).

## 5.1 Fields and constructors

```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceFromOrigin(): number {
    return Math.hypot(this.x, this.y);
  }
}
```

With `"strict": true` (specifically `strictPropertyInitialization`), every field must be assigned in the constructor or have an initializer.

## 5.2 Parameter properties — shorthand

A *very* common shorthand:

```ts
class Point {
  constructor(public readonly x: number, public readonly y: number) {}
}

new Point(1, 2).x;  // 1
```

`public x: number` in the constructor signature both declares the field *and* assigns it.

## 5.3 Access modifiers

| Modifier      | Meaning                                                              |
|---------------|----------------------------------------------------------------------|
| `public`      | Accessible everywhere (default).                                     |
| `protected`   | Accessible in this class and subclasses.                             |
| `private`     | Accessible only inside this class. (TS-level only — see below.)      |
| `#field`      | Accessible only inside this class. (Runtime-enforced — true private.) |
| `readonly`    | Settable in constructor, never reassigned afterwards.                |

```ts
class Account {
  protected balance = 0;
  #pin: string;
  constructor(pin: string) { this.#pin = pin; }

  deposit(n: number) { this.balance += n; }
  verify(p: string) { return p === this.#pin; }
}
```

> **`#field` is the modern choice** when you want privacy at runtime (it's a JS feature). Use TS `private` only for legacy code or when you need cross-instance access (`other.private` works for `private`, but not for `#`).

## 5.4 Inheritance and `super`

```ts
class Animal {
  constructor(public name: string) {}
  move(): string { return `${this.name} moves`; }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);
  }
  override move(): string { return `${this.name} (${this.breed}) runs`; }
}
```

Use the `override` keyword (TS 4.3+) and enable `noImplicitOverride` in tsconfig — the compiler will catch overrides that no longer match the parent.

## 5.5 Abstract classes

A class that **cannot be instantiated**, only extended. Used for shared implementation + abstract slots:

```ts
abstract class Shape {
  abstract area(): number;
  describe(): string { return `area=${this.area()}`; }
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area() { return Math.PI * this.radius ** 2; }
}
```

`new Shape()` is a compile error. `new Circle(2).describe()` works.

## 5.6 Implementing interfaces

```ts
interface Greetable {
  greet(): string;
}

class Person implements Greetable {
  constructor(public name: string) {}
  greet() { return `Hi, I'm ${this.name}`; }
}
```

A class can `implements` many interfaces. Note: `implements` is a *check*, not a *type provider* — your class still needs to declare the fields.

## 5.7 `static` members

```ts
class Counter {
  static instances = 0;
  static create() { Counter.instances++; return new Counter(); }
  private constructor() {}
}
```

Static members live on the class itself, not instances.

## 5.8 Generic classes

```ts
class Box<T> {
  constructor(public value: T) {}
  map<U>(fn: (v: T) => U): Box<U> { return new Box(fn(this.value)); }
}

const b = new Box(2).map(n => n.toString());  // Box<string>
```

We dive deeper in module 6.

## 5.9 `this` types

Returning `this` lets methods chain on subclasses without losing type info:

```ts
class QueryBuilder {
  where(...): this { /* … */ return this; }
  limit(...): this { /* … */ return this; }
}
class UserQueryBuilder extends QueryBuilder {
  withRoles(...): this { return this; }
}

new UserQueryBuilder().where().withRoles().limit();   // ✅ chains preserved
```

## 5.10 Class expression & member visibility

```ts
const Logger = class {
  log(msg: string) { console.log(msg); }
};
```

Less common, but useful for ad-hoc factories.

---

## ✅ Checklist

- [ ] You used parameter properties.
- [ ] You used `#private`.
- [ ] You wrote an `abstract` class.
- [ ] You implemented an interface.
- [ ] You used `override`.

→ Continue to **[Module 6 — Generics](../../06-generics/lesson/README.md)**
