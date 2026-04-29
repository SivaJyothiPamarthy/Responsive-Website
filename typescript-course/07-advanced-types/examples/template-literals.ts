// Template literal types

type Lang = "en" | "ja" | "fr";
type Greeting = `hello-${Lang}`;
const g: Greeting = "hello-fr";

type EventName<T extends string> = `on${Capitalize<T>}`;
type Names = EventName<"click" | "hover" | "submit">;
const n: Names = "onSubmit";

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type Person = { name: string; age: number };
type PersonSetters = Setters<Person>;

const setters: PersonSetters = {
  setName: (v) => console.log("name=", v),
  setAge:  (v) => console.log("age=", v),
};

setters.setName("ada");
setters.setAge(36);
console.log(g, n);

export {};
