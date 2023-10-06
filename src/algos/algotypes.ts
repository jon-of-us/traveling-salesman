import { random, other, type algorithm } from "./algos";

export enum algoLabels {
    "random",
    "other",
}

export function algoFunction(algoLabel: algoLabels): algorithm {
    switch (algoLabel) {
        case algoLabels.random:
            return random;
        case algoLabels.other:
            return other;
    }
}
