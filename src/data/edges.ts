import type { pointIdx } from "./nodes";
import { Nodes } from "./nodes";

export type nodePair = [pointIdx, pointIdx];
export type EdgeType = "normal" | "translucent";

export class Edges {
    private normalEdges = new Set<string>(); // key = "a,b" (sorted), opaque
    private translucentEdges = new Set<string>(); // background/translucent edges

    private getKey(pair: nodePair): string {
        const [a, b] = pair;
        const sorted = a < b ? [a, b] : [b, a];
        return `${sorted[0]},${sorted[1]}`;
    }

    private getPairFromKey(key: string): nodePair {
        const [a, b] = key.split(",").map(Number);
        return [a, b];
    }

    private getEdgeSet(type: EdgeType): Set<string> {
        return type === "normal" ? this.normalEdges : this.translucentEdges;
    }

    constructor(edgesToCopy?: Edges) {
        if (edgesToCopy == undefined) return;
        this.normalEdges = structuredClone(edgesToCopy!.normalEdges)!;
        this.translucentEdges = structuredClone(edgesToCopy!.translucentEdges)!;
    }

    add(p: nodePair, type: EdgeType = "normal"): void {
        if (p[0] === p[1]) throw new Error("self loop not allowed");
        this.getEdgeSet(type).add(this.getKey(p));
    }

    delete(p: nodePair, type: EdgeType = "normal"): boolean {
        return this.getEdgeSet(type).delete(this.getKey(p));
    }

    has(p: nodePair, type: EdgeType = "normal"): boolean {
        return this.getEdgeSet(type).has(this.getKey(p));
    }

    count(type: EdgeType = "normal"): number {
        return this.getEdgeSet(type).size;
    }

    *all(type: EdgeType = "normal"): IterableIterator<nodePair> {
        for (let key of this.getEdgeSet(type)) {
            yield this.getPairFromKey(key);
        }
    }

    clear(type?: EdgeType | "all"): void {
        if (type === undefined || type === "all") {
            this.normalEdges.clear();
            this.translucentEdges.clear();
        } else {
            this.getEdgeSet(type).clear();
        }
    }
}

export function allUsedNodes(edges: Edges): Set<pointIdx> {
    let allUsedNodes = new Set<pointIdx>();
    for (let edge of edges.all()) {
        allUsedNodes.add(edge[0]);
        allUsedNodes.add(edge[1]);
    }
    return allUsedNodes;
}
