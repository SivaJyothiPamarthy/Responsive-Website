// 5.1
class BankAccount {
  #balance = 0;
  constructor(public readonly owner: string) {}
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("amount must be positive");
    this.#balance += amount;
  }
  withdraw(amount: number): boolean {
    if (amount <= 0) throw new Error("amount must be positive");
    if (this.#balance < amount) return false;
    this.#balance -= amount;
    return true;
  }
  get balance(): number { return this.#balance; } // intentional read-only accessor
}

const a = new BankAccount("Ada");
a.deposit(100);
a.withdraw(40);

// 5.2
abstract class Vehicle {
  abstract maxSpeed(): number;
  describe(): string { return `${this.constructor.name}: max ${this.maxSpeed()} km/h`; }
}
class Car      extends Vehicle { maxSpeed() { return 180; } }
class Bicycle  extends Vehicle { maxSpeed() { return 35; } }
class Plane    extends Vehicle { maxSpeed() { return 900; } }

// 5.3
class HttpRequestBuilder {
  protected _method = "GET";
  protected _url    = "/";
  protected _headers: Record<string, string> = {};
  protected _body: unknown;

  method(m: "GET" | "POST" | "PUT" | "DELETE"): this { this._method = m; return this; }
  url(u: string): this                                 { this._url = u; return this; }
  header(k: string, v: string): this                   { this._headers[k] = v; return this; }
  body(b: unknown): this                               { this._body = b; return this; }

  build() {
    return { method: this._method, url: this._url, headers: this._headers, body: this._body };
  }
}

class AuthHttpRequestBuilder extends HttpRequestBuilder {
  bearer(token: string): this { return this.header("Authorization", `Bearer ${token}`); }
}

const req = new AuthHttpRequestBuilder()
  .method("POST")
  .url("/api/users")
  .bearer("xyz")
  .header("X-Trace", "abc")
  .body({ name: "Ada" })
  .build();

console.log(a.balance, req);

export {};
