import { type nodePair } from "../data/edges";
import { Data } from "../data/data";

// no good implementation!!! not efficient

export function* twoOpt(data: Data) {
    while (twoOptStep(data)) {
        yield;
    }
}

/**return if anything changed */
function twoOptStep(data: Data): boolean {
    let edgeList = [...data.edges.all()];
    while (edgeList.length >= 2) {
        let edge1 = edgeList.pop()!;
        for (let edge2 of edgeList) {
            let [crossing, newEdge1, newEdge2] = edgesAreCrossing(
                edge1,
                edge2,
                data
            );
            if (crossing) {
                data.edges.delete(edge1);
                data.edges.delete(edge2);
                data.edges.add(newEdge1);
                data.edges.add(newEdge2);
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
    data: Data
): [boolean, nodePair, nodePair] {
    function testSwap(newEdge1: nodePair, newEdge2: nodePair): boolean {
        if (data.edgeLength(newEdge1) + data.edgeLength(newEdge2) >= lengSum) {
            return false;
        }

        let newData = new Data();
        for (let edge of data.edges.all()) {
            newData.edges.add(edge);
        }
        newData.edges.delete(edge1);
        newData.edges.delete(edge2);
        newData.edges.add(newEdge1);
        newData.edges.add(newEdge2);
        return newData.isClosedLoop();
    }

    const lengSum = data.edgeLength(edge1) + data.edgeLength(edge2);
    const [p1, p2] = edge1;
    const [p3, p4] = edge2;
    if (p1 == p3 || p1 == p4 || p2 == p3 || p2 == p4)
        return [false, edge1, edge2];
    if (testSwap([p1, p3], [p2, p4])) return [true, [p1, p3], [p2, p4]];
    if (testSwap([p1, p4], [p2, p3])) return [true, [p1, p4], [p2, p3]];
    return [false, edge1, edge2];
}
