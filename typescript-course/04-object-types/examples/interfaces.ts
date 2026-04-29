interface Animal { name: string }
interface Dog extends Animal { breed: string }

const rex: Dog = { name: "Rex", breed: "Labrador" };

interface HttpHeaders {
  "content-type": string;
  [name: string]: string;
}

const h: HttpHeaders = {
  "content-type": "application/json",
  "x-trace-id":   "abc-123",
};

console.log(rex, h);

export {};
