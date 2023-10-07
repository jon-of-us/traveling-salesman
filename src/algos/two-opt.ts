import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";

export function* twoOpt(nodes: Nodes, edges: Edges) {}

function twoOptStep(nodes: Nodes, edges: Edges) {
    let edgeList = [...edges.all()];
    while (edgeList.length >= 2) {}
}
