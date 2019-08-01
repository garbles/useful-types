type InternalKeyList<T> = T extends object
  ? { [K in keyof T]-?: [K, InternalKeyList<T[K]>] }[keyof T]
  : null;

// prettier-ignore
type InternalFlattenList<T> =
  T extends [infer A, infer B] ?
  B extends null ? [A] :
  B extends [infer C, infer D] ?
  D extends null ? [A] | [A, C] :
  D extends [infer E, infer F] ?
  F extends null ? [A] | [A, C] | [A, C, E] :
  F extends [infer G, infer H] ?
  H extends null ? [A] | [A, C] | [A, C, E] | [A, C, E, G] :
  [] : [] : [] : [] : [];

/**
 * Returns all valid key paths for a given type alias `T`.
 */
export type KeyPath<T> = InternalFlattenList<InternalKeyList<T>>;

// prettier-ignore
/**
 * Returns the value type from a key path `KP` on a type alias `T`.
 */
export type KeyPathValue<T, KP> =
  KP extends [] ? T :
  KP extends [infer A] ? A extends keyof T ? T[A] : never :
  KP extends [infer A, infer B] ? A extends keyof T ? B extends keyof T[A] ? T[A][B] : never : never :
  KP extends [infer A, infer B, infer C] ? A extends keyof T ? B extends keyof T[A] ? C extends keyof T[A][B] ? T[A][B][C] : never : never : never :
  KP extends [infer A, infer B, infer C, infer D] ? A extends keyof T ? B extends keyof T[A] ? C extends keyof T[A][B] ? D extends keyof T[A][B][C] ? T[A][B][C][D] : never : never : never : never :
  KP extends [infer A, infer B, infer C, infer D, infer E] ? A extends keyof T ? B extends keyof T[A] ? C extends keyof T[A][B] ? D extends keyof T[A][B][C] ? E extends keyof T[A][B][C][D] ? T[A][B][C][D][E] : never : never : never : never : never :
  KP extends [infer A, infer B, infer C, infer D, infer E, infer F] ? A extends keyof T ? B extends keyof T[A] ? C extends keyof T[A][B] ? D extends keyof T[A][B][C] ? E extends keyof T[A][B][C][D] ? F extends keyof T[A][B][C][D][E] ? T[A][B][C][D][E][F] : never : never : never : never : never : never :
  KP extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G] ? A extends keyof T ? B extends keyof T[A] ? C extends keyof T[A][B] ? D extends keyof T[A][B][C] ? E extends keyof T[A][B][C][D] ? F extends keyof T[A][B][C][D][E] ? G extends keyof T[A][B][C][D][E][F] ? T[A][B][C][D][E][F][G] : never : never : never : never : never : never : never :
  never;