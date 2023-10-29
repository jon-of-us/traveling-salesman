import { Data } from "../data/data";
import { type nodePair } from "../data/edges";
import { type pointIdx } from "../data/nodes";

/**requirements:
 * - node is not connected
 * inserts node between one edge
 * chooses edge, so that the resulting path is shortest
 * */
export function insertNodeCheap(node: pointIdx, data: Data) {
    const { bestEdgeToInsert } = findCheapestInsertion(node, data);
    data.edges.delete(bestEdgeToInsert);
    data.edges.add([node, bestEdgeToInsert[0]]);
    data.edges.add([node, bestEdgeToInsert[1]]);
}

export function findCheapestInsertion(
    node: pointIdx,
    data: Data
): { bestEdgeToInsert: nodePair; minLeng: number } {
    let minLeng = Infinity;
    let bestEdgeToInsert: nodePair;
    for (let edge of data.edges.all()) {
        const addedLeng =
            data.edgeLength([node, edge[0]]) +
            data.edgeLength([node, edge[1]]) -
            data.edgeLength(edge);
        if (addedLeng < minLeng) {
            minLeng = addedLeng;
            bestEdgeToInsert = edge;
        }
    }
    bestEdgeToInsert = bestEdgeToInsert!;
    return { bestEdgeToInsert, minLeng };
}
