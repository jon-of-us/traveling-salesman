import { Nodes } from "../data/nodes";
import { Edges, type nodePair } from "../data/edges";
import { findCheapestInsertion } from "./helper_algos";
import { type pointIdx } from "../data/nodes";

/**starter algo, which creates a random triangle, and then repetitively inserts the node, which is cheapest to insert */
//can be implemented faster
export function* cheapestInsertion(nodes: Nodes, edges: Edges) {
    edges.clear();
    let nodeList = [...nodes.all()];
    let [n1, n2, n3] = nodeList.splice(0, 3);
    edges.add([n1, n2]);
    edges.add([n2, n3]);
    edges.add([n1, n3]);
    yield;
    while (nodeList.length > 0) {
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
        nodeList.splice(nodeList.indexOf(minNode), 1);
        edges.delete(allBestEdge);
        edges.add([minNode, allBestEdge[0]]);
        edges.add([minNode, allBestEdge[1]]);
        yield;
    }
}
