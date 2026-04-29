// The most-used utility types in action

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type SafeUser  = Omit<User, "password">;
type UserPatch = Partial<User>;
type UserMap   = Record<string, User>;

const safe: SafeUser  = { id: 1, name: "ada", email: "ada@x.io" };
const patch: UserPatch = { name: "Ada Lovelace" };
const map: UserMap = { [safe.id]: { ...safe, password: "secret" } };

// ReturnType / Parameters
function getById(users: User[], id: number): User | undefined {
  return users.find(u => u.id === id);
}
type GetByIdReturn = ReturnType<typeof getById>;
type GetByIdParams = Parameters<typeof getById>;

const params: GetByIdParams = [[], 1];
const result: GetByIdReturn = undefined;
console.log(safe, patch, map, params, result);

export {};
