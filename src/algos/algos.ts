import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";
import { algoFunction, type algoLabels } from "./algotypes";

export type algorithm = (
    nodes: Nodes,
    edges: Edges
) => Generator<undefined, void, unknown>;

/**simple number hash */
function hash(n: number) {
    return (n * 2654435761) % 2 ** 32;
}

export function* random(nodes: Nodes, edges: Edges) {
    let allNodesRandom = [...nodes.all()].sort((a, b) => hash(a) - hash(b));
    edges.clear();
    let e = [];
    for (let i = 0; i < allNodesRandom.length; i++) {
        e.push([
            allNodesRandom[i],
            allNodesRandom[(i + 1) % allNodesRandom.length],
        ]);
        edges.add([
            allNodesRandom[i],
            allNodesRandom[(i + 1) % allNodesRandom.length],
        ]);
        yield;
    }
}
export function* twoOpt(nodes: Nodes, edges: Edges) {}
export function run(nodes: Nodes, edges: Edges, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    return algoFunc(nodes, edges);
}
export function runAll(nodes: Nodes, edges: Edges, algoLabel: algoLabels) {
    const algoFunc = algoFunction(algoLabel);
    for (let _ of algoFunc(nodes, edges)) {
    }
}
