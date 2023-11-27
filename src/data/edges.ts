import type { pointIdx } from "./nodes";
import { Nodes } from "./nodes";

export type nodePair = [pointIdx, pointIdx];

export class Edges {
    edges = new Set<number>();
    private associateNumber(pair: nodePair) {
        let p = [...pair].sort((a, b) => a - b).reverse();
        return (p[0] * (p[0] + 1)) / 2 + p[1];
    }
    private disassociateNumber(num: number): nodePair {
        let a = Math.floor((Math.sqrt(8 * num + 1) - 1) / 2);
        let b = num - (a * (a + 1)) / 2;
        return [a, b];
    }
    constructor(edgesToCopy?: Edges) {
        if (edgesToCopy == undefined) return;
        this.edges = structuredClone(edgesToCopy!.edges)!;
    }
    add(p: nodePair): void {
        if (p[0] === p[1]) throw new Error("self loop not allowed");
        this.edges.add(this.associateNumber(p));
    }
    delete(p: nodePair): boolean {
        return this.edges.delete(this.associateNumber(p));
    }
    has(p: nodePair): boolean {
        return this.edges.has(this.associateNumber(p));
    }
    count(): number {
        return this.edges.size;
    }
    *all(): IterableIterator<nodePair> {
        for (let num of this.edges) {
            yield this.disassociateNumber(num);
        }
    }
    clear(): void {
        this.edges.clear();
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
