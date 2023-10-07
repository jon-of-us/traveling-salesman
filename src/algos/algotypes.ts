import { random, twoOpt, type algorithm } from "./algos";

export enum algoLabels {
    "random",
    "two-opt",
}

export function algoFunction(algoLabel: algoLabels): algorithm {
    switch (algoLabel) {
        case algoLabels.random:
            return random;
        case algoLabels["two-opt"]:
            return twoOpt;
    }
}
