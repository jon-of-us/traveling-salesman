import { Nodes, type pointIdx } from "../data/nodes";
import { Edges, type nodePair } from "../data/edges";
import { length } from "../data/data_utils";

/**requirements:
 * - node is not connected
 * inserts node between one edge
 * chooses edge, so that the resulting path is shortest
 * */
export function insertNodeCheap(node: pointIdx, nodes: Nodes, edges: Edges) {
    let minLeng = Infinity;
    let bestEdgeToRemove: nodePair;
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
}
