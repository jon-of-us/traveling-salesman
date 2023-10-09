import { Nodes } from "../data/nodes";
import { Edges, neighbors, type nodePair } from "../data/edges";
import { type pointIdx } from "../data/nodes";
import { insertNodeCheap } from "./helper_algos";

/**optimizer */
export function* nextNeighbor(nodes: Nodes, edges: Edges) {
    const nodeList = [...nodes.all()];
    for (let i = 0; i < nodeList.length; i++) {
        const node = nodeList[i];
        if (optimizeConnection(node, nodes, edges)) {
            i = 0;
            yield;
        }
    }
}

/** return true if place of insertion changed */
function optimizeConnection(
    node: pointIdx,
    nodes: Nodes,
    edges: Edges
): boolean {
    const nodeNeigbors = [...neighbors(edges, node)];
    edges.delete([node, nodeNeigbors[0]]);
    edges.delete([node, nodeNeigbors[1]]);
    const skippedConnection: nodePair = [nodeNeigbors[0], nodeNeigbors[1]];
    edges.add(skippedConnection);
    insertNodeCheap(node, nodes, edges);
    return edges.has(skippedConnection);
}
