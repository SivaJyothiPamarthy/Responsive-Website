# Module 10 — Exercises

## 10.1 `@time`

Write a TC39 method decorator `@time` that logs how long a method took:

```
[time] User.findById took 12.3 ms
```

## 10.2 `@deprecated(message)`

A decorator factory that prints a one-time warning the first time a method is called:

```ts
class Old {
  @deprecated("use createUser instead")
  newUser() { /* ... */ }
}
```

## 10.3 Auto-bind class

Write `@autobind` *class* decorator that, after construction, binds every own method to the instance. (Hint: iterate `Object.getOwnPropertyNames(proto)`.)

→ Solutions in `solutions.ts`.
