import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";
import { algoFunction, type algoLabels } from "./algotypes";

export type algorithm = (
    nodes: Nodes,
    edges: Edges
) => Generator<undefined, void, unknown>;

export function* random(nodes: Nodes, edges: Edges) {
    let allNodesRandom = [...nodes.all()].sort((a, b) =>
        Math.round(Math.random())
    );
}
export function* other(nodes: Nodes, edges: Edges) {
    for (let i = 0; i < 100; i++) {
        yield;
    }
}
export function run(nodes: Nodes, edges: Edges, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    return algoFunc(nodes, edges);
}
export function runAll(nodes: Nodes, edges: Edges, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    for (let _ in algoFunc(nodes, edges));
}
