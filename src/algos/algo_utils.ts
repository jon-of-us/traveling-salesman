import { random } from "./random";
import { twoOpt } from "./two-opt";
import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";
import { nextNeighbor } from "./next_neighbor";
import { cheapestInsertion } from "./cheapest_insertion";
import { shortestEdge } from "./greedy";

export enum algoLabels {
    "random",
    "twoOpt",
    "nextNeighbor",
    "cheapestInsertion",
    "shortestEdge",
}

export type algorithm = (
    nodes: Nodes,
    edges: Edges
) => Generator<undefined, void, unknown>;

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

export function runStep(nodes: Nodes, edges: Edges, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    return algoFunc(nodes, edges).next().done;
}
export function runAll(nodes: Nodes, edges: Edges, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    for (let _ of algoFunc(nodes, edges)) {
    }
}
