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
            i = -1;
            yield;
        }
    }
}

/**removes node from cycle, and reinserts it in the optimal edge. return true if place of insertion changed */
function optimizeConnection(node: pointIdx, data: Data): boolean {
    const nodeNeighbors = [...data.neighbors(node)];
    data.edges.delete([node, nodeNeighbors[0]]);
    data.edges.delete([node, nodeNeighbors[1]]);
    const skippedConnection: nodePair = [nodeNeighbors[0], nodeNeighbors[1]];
    data.edges.add(skippedConnection);
    insertNodeCheap(node, data);
    return data.edges.has(skippedConnection);
}
