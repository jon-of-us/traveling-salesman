import { type nodePair } from "../data/edges";
import { findCheapestInsertion } from "./helper_algos";
import { type pointIdx } from "../data/nodes";
import { Data } from "../data/data";

/**starter algo, which creates a random triangle, and then repetitively inserts the node, which is cheapest to insert */
//can be implemented faster
export function* cheapestInsertion(data: Data) {
    data.edges.clear();
    let nodeList = [...data.nodes.all()];
    let [n1, n2, n3] = nodeList.splice(0, 3);
    data.edges.add([n1, n2]);
    data.edges.add([n2, n3]);
    data.edges.add([n1, n3]);
    yield;
    while (nodeList.length > 0) {
        let minNode: pointIdx;
        let allBestEdge: nodePair;
        let allMinLeng = Infinity;
        for (let node of nodeList) {
            let { bestEdgeToInsert, minLeng } = findCheapestInsertion(
                node,
                data
            );
            if (minLeng < allMinLeng) {
                allMinLeng = minLeng;
                minNode = node;
                allBestEdge = bestEdgeToInsert;
            }
        }
        allBestEdge = allBestEdge!;
        minNode = minNode!;
        nodeList.splice(nodeList.indexOf(minNode), 1);
        data.edges.delete(allBestEdge);
        data.edges.add([minNode, allBestEdge[0]]);
        data.edges.add([minNode, allBestEdge[1]]);
        yield;
    }
}
