import { random } from "./random";
import { twoOpt } from "./two-opt";
import { nextNeighbor } from "./next_neighbor";
import { cheapestInsertion } from "./cheapest_insertion";
import { shortestEdge } from "./greedy";
import type { Data } from "../data/data";

export enum algoLabels {
    "random",
    "twoOpt",
    "nextNeighbor",
    "cheapestInsertion",
    "shortestEdge",
}

export type algorithm = (data: Data) => Generator<undefined, void, unknown>;

export function algoFunction(algoLabel: algoLabels): algorithm {
    switch (algoLabel) {
        case algoLabels.random:
            return random;
        case algoLabels.twoOpt:
            return twoOpt;
        case algoLabels.nextNeighbor:
            return nextNeighbor;
        case algoLabels.cheapestInsertion:
            return cheapestInsertion;
        case algoLabels.shortestEdge:
            return shortestEdge;
    }
}

export function runStep(data: Data, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    return algoFunc(data).next().done;
}
export function runAll(data: Data, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    for (let _ of algoFunc(data)) {
    }
}
