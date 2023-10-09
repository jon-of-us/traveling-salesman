import { Nodes, type pointIdx } from "../data/nodes";
import { Edges, type nodePair } from "../data/edges";
import { length } from "../data/data_utils";

/**requirements:
 * - node is not connected
 * inserts node between one edge
 * chooses edge, so that the resulting path is shortest
 * */
export function insertNodeCheap(node: pointIdx, nodes: Nodes, edges: Edges) {
    const { bestEdgeToInsert } = findCheapestInsertion(node, nodes, edges);
    edges.delete(bestEdgeToInsert);
    edges.add([node, bestEdgeToInsert[0]]);
    edges.add([node, bestEdgeToInsert[1]]);
}

export function findCheapestInsertion(
    node: pointIdx,
    nodes: Nodes,
    edges: Edges
): { bestEdgeToInsert: nodePair; minLeng: number } {
    let minLeng = Infinity;
    let bestEdgeToInsert: nodePair;
    for (let edge of edges.all()) {
        const addedLeng =
            length([node, edge[0]], nodes) +
            length([node, edge[1]], nodes) -
            length(edge, nodes);
        if (addedLeng < minLeng) {
            minLeng = addedLeng;
            bestEdgeToInsert = edge;
        }
    }
    bestEdgeToInsert = bestEdgeToInsert!;
    return { bestEdgeToInsert, minLeng };
}
