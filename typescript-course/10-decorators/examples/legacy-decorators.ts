// Legacy / experimental decorators — used by Angular / NestJS / TypeORM.
// Requires `"experimentalDecorators": true` in tsconfig.json.

function Log(_target: any, key: string, desc: PropertyDescriptor) {
  const original = desc.value;
  desc.value = function (...args: any[]) {
    console.log(`call ${key}`, args);
    return original.apply(this, args);
  };
}

function Entity(name: string) {
  return function (target: any) {
    target.entityName = name;
  };
}

@Entity("users")
class UserRepo {
  @Log
  findById(id: number) { return { id, name: "ada" }; }
}

console.log((UserRepo as any).entityName);
console.log(new UserRepo().findById(1));

export {};
