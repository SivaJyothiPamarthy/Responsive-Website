// Parameter properties + #private + override

class Animal {
  constructor(public readonly name: string) {}
  move(): string { return `${this.name} moves`; }
}

class Dog extends Animal {
  constructor(name: string, public readonly breed: string) {
    super(name);
  }
  override move(): string {
    return `${this.name} (${this.breed}) runs`;
  }
}

abstract class Shape {
  abstract area(): number;
  describe(): string { return `area=${this.area().toFixed(2)}`; }
}

class Circle extends Shape {
  constructor(public radius: number) { super(); }
  area(): number { return Math.PI * this.radius ** 2; }
}

class Counter {
  static count = 0;
  #id: number;
  constructor() {
    Counter.count += 1;
    this.#id = Counter.count;
  }
  get id() { return this.#id; }
}

console.log(new Dog("Rex", "Labrador").move());
console.log(new Circle(3).describe());
console.log(new Counter().id, new Counter().id, Counter.count);

export {};
