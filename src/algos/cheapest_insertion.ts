import { Nodes } from "../data/nodes";
import { Edges, allUsedNodes, type nodePair } from "../data/edges";
import { findCheapestInsertion } from "./helper_algos";
import { type pointIdx } from "../data/nodes";

/**starter algo, which creates a random edge, and then repetitively inserts the node, which is cheapest to insert */
//can be implemented faster
export function* cheapestInsertion(nodes: Nodes, edges: Edges) {
    edges.clear();
    let nodeList = [...nodes.all()];
    edges.add([nodeList.pop()!, nodeList.pop()!]);
    yield;
    while (!!nodeList) {
        let minNode: pointIdx;
        let allBestEdge: nodePair;
        let allMinLeng = Infinity;
        for (let node of nodeList) {
            let { bestEdgeToInsert, minLeng } = findCheapestInsertion(
                node,
                nodes,
                edges
            );
            if (minLeng < allMinLeng) {
                minNode = node;
                allBestEdge = bestEdgeToInsert;
            }
        }
        allBestEdge = allBestEdge!;
        minNode = minNode!;
        edges.delete(allBestEdge);
        edges.add([minNode, allBestEdge[0]]);
        edges.add([minNode, allBestEdge[1]]);
        yield;
    }
}
