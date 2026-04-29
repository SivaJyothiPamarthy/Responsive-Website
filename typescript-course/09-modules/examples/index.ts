// Barrel + named/default/type-only imports

import multiply, { PI, add } from "./math";
import * as Math2 from "./math";
import type { User } from "./user";
import { getUser } from "./user";

const u: User = getUser("u_1");
console.log(u, PI, add(1, 2), multiply(3, 4), Math2.sub(5, 2));

// Re-export style
export { add, PI } from "./math";
export type { User } from "./user";
