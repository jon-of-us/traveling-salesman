import type { Data } from "../data/data";
import { type nodePair } from "../data/edges";

class NodeInfo {
    timesUsed = 0;
    constructor(private partition: number | NodeInfo) {}
    getPartition(): number {
        switch (typeof this.partition) {
            case "number":
                return this.partition;
            case "object":
                return this.partition.getPartition();
        }
    }
    setPartition(pointer: NodeInfo) {
        if (typeof this.partition == "object") {
            this.partition.setPartition(pointer);
        }
        this.partition = pointer;
    }
    incrementTimesUsed() {
        this.timesUsed++;
    }
    isUsedUp() {
        return this.timesUsed >= 2;
    }
}

/** starter. Inserts shortest possible edge */
export function* shortestEdge(data: Data) {
    data.edges.clear();
    /**every possible edge*/
    let allEdgesAndLength: [nodePair, number][] = [];
    let nodeList = [...data.nodes.all()];
    for (let i = 0; i < nodeList.length - 1; i++) {
        for (let j = i + 1; j < nodeList.length; j++) {
            let edge: nodePair = [nodeList[i], nodeList[j]];
            allEdgesAndLength.push([edge, data.length(edge)]);
        }
    }
    allEdgesAndLength.sort((a, b) => a[1] - b[1]);
    let nodeInfo = new Map<number, NodeInfo>(
        nodeList.map((node, idx) => [node, new NodeInfo(idx)])
    );
    for (let [edge, _] of allEdgesAndLength) {
        if (data.edges.count() == data.nodes.count() - 1) {
            break;
        }
        let node0 = nodeInfo.get(edge[0])!;
        let node1 = nodeInfo.get(edge[1])!;
        if (
            node0.isUsedUp() ||
            node1.isUsedUp() ||
            node0.getPartition() == node1.getPartition()
        ) {
            continue;
        }
        data.edges.add(edge);
        node0.incrementTimesUsed();
        node1.incrementTimesUsed();
        node0.setPartition(node1);
        yield;
    }
    let remainingNodes = nodeList.filter(
        (node) => !nodeInfo.get(node)!.isUsedUp()
    );
    data.edges.add(remainingNodes as nodePair);
    yield;
}
