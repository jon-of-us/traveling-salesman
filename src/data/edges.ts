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

export function neighborMap(edges: Edges): Map<pointIdx, Set<pointIdx>> {
    let map = new Map<pointIdx, Set<pointIdx>>();
    for (let [a, b] of edges.all()) {
        if (!map.has(a)) map.set(a, new Set());
        if (!map.has(b)) map.set(b, new Set());
        map.get(a)?.add(b);
        map.get(b)?.add(a);
    }
    return map;
}
export function neighbors(edges: Edges, idx: pointIdx): Set<pointIdx> {
    let neighbors = new Set<pointIdx>();
    for (let [a, b] of edges.all()) {
        if (a === idx) neighbors.add(b);
        if (b === idx) neighbors.add(a);
    }
    return neighbors;
}
export function isClosedLoop(edges: Edges): boolean {
    if (edges.count() < 3) return false;
    let map = neighborMap(edges);

    let start = map.keys().next().value;
    let last = -1;
    let next = start;
    let nVisited = 0;
    do {
        let neighbors = [...map.get(next)!.values()];
        if (neighbors.length !== 2) return false;
        neighbors = neighbors.filter((n) => n !== last);
        last = next;
        next = neighbors[0];
        nVisited++;
    } while (next !== start && nVisited <= edges.count() + 1);
    return nVisited === edges.count();
}
