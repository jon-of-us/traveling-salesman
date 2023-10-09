import type { Data } from "../data/data";
import { type nodePair } from "../data/edges";
import { type pointIdx } from "../data/nodes";
import { insertNodeCheap } from "./helper_algos";

/**optimizer */
export function* nextNeighbor(data: Data) {
    const nodeList = [...data.nodes.all()];
    for (let i = 0; i < nodeList.length; i++) {
        const node = nodeList[i];
        if (optimizeConnection(node, data)) {
            i = 0;
            yield;
        }
    }
}

/** return true if place of insertion changed */
function optimizeConnection(node: pointIdx, data: Data): boolean {
    const nodeNeigbors = [...data.neighbors(node)];
    data.edges.delete([node, nodeNeigbors[0]]);
    data.edges.delete([node, nodeNeigbors[1]]);
    const skippedConnection: nodePair = [nodeNeigbors[0], nodeNeigbors[1]];
    data.edges.add(skippedConnection);
    insertNodeCheap(node, data);
    return data.edges.has(skippedConnection);
}
