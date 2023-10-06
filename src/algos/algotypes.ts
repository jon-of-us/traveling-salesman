import { random, other, type algorithm } from "./algos";

export const algoFunction = {
    random: random,
    other: other,
} as const;

export type algoOptions = keyof typeof algoFunction;
