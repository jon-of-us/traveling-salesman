import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";
import { type nodePair } from "../data/edges";
import { length } from "../data/data_utils";
import { isClosedLoop } from "../data/edges";

export function* twoOpt(nodes: Nodes, edges: Edges) {
    while (twoOptStep(nodes, edges)) {
        yield;
    }
}

/**return if anything changed */
function twoOptStep(nodes: Nodes, edges: Edges): boolean {
    let edgeList = [...edges.all()];
    while (edgeList.length >= 2) {
        let edge1 = edgeList.pop()!;
        for (let edge2 of edgeList) {
            let [crossing, newEdge1, newEdge2] = edgesAreCrossing(
                edge1,
                edge2,
                nodes,
                edges
            );
            if (crossing) {
                edgeList.splice(edgeList.indexOf(edge1), 1);
                edgeList.splice(edgeList.indexOf(edge2), 1);
                edgeList.push(newEdge1);
                edgeList.push(newEdge2);
                return true;
            }
        }
    }
    return false;
}

/**returns true if the two edges are crossing, and returns the two edges after swapping them */
export function edgesAreCrossing(
    edge1: nodePair,
    edge2: nodePair,
    nodes: Nodes,
    edges: Edges
): [boolean, nodePair, nodePair] {
    function testSwap(newEdge1: nodePair, newEdge2: nodePair): boolean {
        if (length([p1, p3], nodes) + length([p2, p4], nodes) >= lengSum) {
            return false;
        }
        let newEdgeList = [...edges.all()];
        newEdgeList.splice(newEdgeList.indexOf(edge1), 1);
        newEdgeList.splice(newEdgeList.indexOf(edge2), 1);
        newEdgeList.push(newEdge1);
        newEdgeList.push(newEdge2);
        let newEdges = new Edges();
        for (let edge of newEdgeList) {
            newEdges.add(edge);
        }
        return isClosedLoop(newEdges);
    }

    const lengSum = length(edge1, nodes) + length(edge2, nodes);
    const [p1, p2] = edge1;
    const [p3, p4] = edge2;
    if (testSwap([p1, p3], [p2, p4])) return [true, [p1, p3], [p2, p4]];
    if (testSwap([p1, p4], [p2, p3])) return [true, [p1, p4], [p2, p3]];
    return [false, edge1, edge2];
}
