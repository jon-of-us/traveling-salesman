import { random } from "./random";
import { twoOpt } from "./two-opt";
import { nextNeighbor } from "./next_neighbor";
import { cheapestInsertion } from "./cheapest_insertion";
import { shortestEdge } from "./greedy";
import type { Data } from "../data/data";

export const initAlgoLabels = [
    "random",
    "shortestEdge",
    "cheapestInsertion",
] as const;
export type initAlgoLabel = (typeof initAlgoLabels)[number];

export const optimAlgoLabels = ["twoOpt", "nextNeighbor"] as const;
export type optimAlgoLabel = (typeof optimAlgoLabels)[number];

export type algoLabel = initAlgoLabel | optimAlgoLabel;

export type algorithm = (data: Data) => Generator<undefined, void, unknown>;

export function algoDescription(algoLabel: algoLabel): string {
    switch (algoLabel) {
        case "random":
            return "Randomly chosen edges, which form a cycle";
        case "twoOpt":
            return "Select two edges and swap them if it improves the total distance (this removes a crossing)";
        case "nextNeighbor":
            return "Select the closest neighbor to the current node";
        case "cheapestInsertion":
            return "Insert the closest node to the current cycle";
        case "shortestEdge":
            return "Select the shortest edge";
    }
}

export function algoFunction(algoLabel: algoLabel): algorithm {
    switch (algoLabel) {
        case "random":
            return random;
        case "twoOpt":
            return twoOpt;
        case "nextNeighbor":
            return nextNeighbor;
        case "cheapestInsertion":
            return cheapestInsertion;
        case "shortestEdge":
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
