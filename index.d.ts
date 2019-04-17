type KeyList<T> = T extends object
  ? { [K in keyof T]-?: [K, KeyList<T[K]>] }[keyof T]
  : null;

// prettier-ignore
type FlattenList<T> =
  T extends [infer A, null] ? [A] :
  T extends [infer A, [infer B, null] | null] ? [A, B] | [A] :
  T extends [infer A, [infer B, [infer C, null] | null] | null] ? [A, B, C] | [A, B] | [A] :
  T extends [infer A, [infer B, [infer C, [infer D, null] | null] | null] | null] ? [A, B, C, D] | [A, B, C] | [A, B] | [A] :
  T extends [infer A, [infer B, [infer C, [infer D, [infer E, null] | null] | null] | null] | null] ? [A, B, C, D, E] | [A, B, C, D] | [A, B, C] | [A, B] | [A] :
  T extends [infer A, [infer B, [infer C, [infer D, [infer E, [infer F, null] | null] | null] | null] | null] | null] ? [A, B, C, D, E, F] | [A, B, C, D, E] | [A, B, C, D] | [A, B, C] | [A, B] | [A] :
  T extends [infer A, [infer B, [infer C, [infer D, [infer E, [infer F, [infer G, null] | null] | null] | null] | null] | null] | null] ? [A, B, C, D, E, F, G] | [A, B, C, D, E, F] | [A, B, C, D, E] | [A, B, C, D] | [A, B, C] | [A, B] | [A] :
  T extends [infer A, [infer B, [infer C, [infer D, [infer E, [infer F, [infer G, [infer H, null] | null] | null] | null] | null] | null] | null] | null] ? [A, B, C, D, E, F, G, H] | [A, B, C, D, E, F, G] | [A, B, C, D, E, F] | [A, B, C, D, E] | [A, B, C, D] | [A, B, C] | [A, B] | [A] :
  [];

/**
 * Returns all valid key paths for a given type alias `T`.
 * For example, `KeyPath<{a?: {b: string}, c: number}>` will
 * result in `["a", "b"] | ["a"] | ["c"]`.
 */
export type KeyPath<T> = FlattenList<KeyList<T>>;
