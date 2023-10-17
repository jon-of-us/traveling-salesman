import { random } from "./random";
import { twoOpt } from "./two-opt";
import { nextNeighbor } from "./next_neighbor";
import { cheapestInsertion } from "./cheapest_insertion";
import { shortestEdge } from "./greedy";
import type { Data } from "../data/data";

export const initAlgoLabels = [
    "Random",
    "Shortest edge",
    "Cheapest insertion",
] as const;
export type initAlgoLabel = (typeof initAlgoLabels)[number];

export const optimAlgoLabels = ["2-Opt", "Next neighbor"] as const;
export type optimAlgoLabel = (typeof optimAlgoLabels)[number];

export type algoLabel = initAlgoLabel | optimAlgoLabel;

export type algorithm = (data: Data) => Generator<undefined, void, unknown>;

export function algoDescription(algoLabel: algoLabel): string {
    switch (algoLabel) {
        case "Random":
            return "Randomly chosen edges, which form a cycle";
        case "2-Opt":
            return "Select two edges and swap them if it improves the total distance (this removes a crossing)";
        case "Next neighbor":
            return "Select the closest neighbor to the current node";
        case "Cheapest insertion":
            return "Insert the closest node to the current cycle";
        case "Shortest edge":
            return "Select the shortest edge";
    }
}

export function algoFunction(algoLabel: algoLabel): algorithm {
    switch (algoLabel) {
        case "Random":
            return random;
        case "2-Opt":
            return twoOpt;
        case "Next neighbor":
            return nextNeighbor;
        case "Cheapest insertion":
            return cheapestInsertion;
        case "Shortest edge":
            return shortestEdge;
    }
}

export function runStep(data: Data, algoLabel: algoLabel) {
    const algoFunc = algoFunction(algoLabel);
    return algoFunc(data).next().done;
}
export function runAll(data: Data, algoLabel: algoLabel) {
    const algoFunc = algoFunction(algoLabel);
    for (let _ of algoFunc(data)) {
    }
}
