import { Nodes } from "../data/nodes";
import { Edges, neighbors, type nodePair } from "../data/edges";
import { length } from "../data/data_utils";
import { type pointIdx } from "../data/nodes";

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
    // search best place to insert
    let minLeng = Infinity;
    let bestEdgeToRemove;
    for (let edge of edges.all()) {
        const addedLeng =
            length([node, edge[0]], nodes) +
            length([node, edge[1]], nodes) -
            length(edge, nodes);
        if (addedLeng < minLeng) {
            minLeng = addedLeng;
            bestEdgeToRemove = edge;
        }
    }
    edges.delete(bestEdgeToRemove!);
    edges.add([node, bestEdgeToRemove![0]]);
    edges.add([node, bestEdgeToRemove![1]]);
    return bestEdgeToRemove != skippedConnection;
}
