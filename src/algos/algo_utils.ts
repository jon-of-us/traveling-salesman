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

export const optimAlgoLabels = ["Next neighbor", "2-Opt"] as const;
export type optimAlgoLabel = (typeof optimAlgoLabels)[number];

export type algoLabel = initAlgoLabel | optimAlgoLabel;

export type algorithm = (data: Data) => Generator<undefined, void, unknown>;

export function algoDescription(algoLabel: algoLabel): string {
    switch (algoLabel) {
        case "Random":
            return "Randomly chosen edges, which form a cycle";
        case "2-Opt":
            return "Select two edges and swap them if it improves the total distance (often this removes a crossing)";
        case "Next neighbor":
            return "Select the closest neighbor to the current node";
        case "Cheapest insertion":
            return "Start with a random Triangle. Insert the closest node to the current cycle";
        case "Shortest edge":
            return "Start without any edges. Select the shortest edge and add it to the graph, if it is still possible to form a cycle after that. Repeat until all nodes are connected";
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

/** run the algorithm and yield after each step */
export function* runSteps(data: Data, algoLabel: algoLabel) {
    const algoFunc = algoFunction(algoLabel);
    yield* algoFunc(data);
}
export function runAll(data: Data, algoLabel: algoLabel) {
    const algoFunc = algoFunction(algoLabel);
    for (let _ of algoFunc(data)) {
    }
}
