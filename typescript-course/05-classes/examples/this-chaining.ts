// Returning `this` preserves the subclass type when chaining.

class QueryBuilder {
  protected parts: string[] = [];
  where(clause: string): this { this.parts.push(`WHERE ${clause}`); return this; }
  limit(n: number): this      { this.parts.push(`LIMIT ${n}`);      return this; }
  build(): string             { return this.parts.join(" "); }
}

class UserQueryBuilder extends QueryBuilder {
  withRoles(...roles: string[]): this {
    this.parts.push(`ROLES IN (${roles.map(r => `'${r}'`).join(",")})`);
    return this;
  }
}

const q = new UserQueryBuilder()
  .where("active = 1")
  .withRoles("admin", "owner")
  .limit(10)
  .build();

console.log(q);

export {};
