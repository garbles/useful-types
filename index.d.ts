type KeyList<T> = T extends object
  ? { [K in keyof T]-?: [K, KeyList<T[K]>] }[keyof T]
  : null;

// prettier-ignore
type FlattenList<T> =
  T extends [infer A, infer B] ?
    B extends null ? [A] :
    B extends [infer C, infer D] ?
      D extends null ? [A] | [A, C] :
      D extends [infer E, infer F] ?
        F extends null ? [A] | [A, C] | [A, C, E] :
        F extends [infer G, infer H] ?
          H extends null ? [A] | [A, C] | [A, C, E] | [A, C, E, G] :
          H extends [infer I, infer J] ?
            J extends null ? [A] | [A, C] | [A, C, E] | [A, C, E, G] | [A, C, E, G, I] :
            J extends [infer K, infer L] ?
              L extends null ? [A] | [A, C] | [A, C, E] | [A, C, E, G] | [A, C, E, G, I] | [A, C, E, G, I, K] :
              L extends [infer M, infer N] ?
                N extends null ? [A] | [A, C] | [A, C, E] | [A, C, E, G] | [A, C, E, G, I] | [A, C, E, G, I, K] | [A, C, E, G, I, K, M] :
                N extends [infer O, infer P] ?
                  P extends null ? [A] | [A, C] | [A, C, E] | [A, C, E, G] | [A, C, E, G, I] | [A, C, E, G, I, K] | [A, C, E, G, I, K, M] | [A, C, E, G, I, K, M, O] :
  [] : [] : [] : [] : [] : [] : [] : [] : [];

/**
 * Returns all valid key paths for a given type alias `T`.
 * For example, `KeyPath<{a?: {b: string}, c: number}>` will
 * result in `["a", "b"] | ["a"] | ["c"]`.
 */
export type KeyPath<T> = FlattenList<KeyList<T>>;
