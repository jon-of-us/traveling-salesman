import type { pointIdx } from "./nodes";

type nodePair = [pointIdx, pointIdx];

export class Edges {
    edges = new Set<nodePair>();
    add(pair: nodePair): void {
        if (pair[0] === pair[1]) throw new Error("self loop not allowed");
        this.edges.add(pair.sort());
    }
    delete(pair: nodePair): boolean {
        return this.edges.delete(pair.sort());
    }
    has(pair: nodePair): boolean {
        return this.edges.has(pair.sort());
    }
    count(): number {
        return this.edges.size;
    }
    all(): IterableIterator<nodePair> {
        return this.edges.values();
    }
    clear(): void {
        this.edges.clear();
    }
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
    let map = neighborMap(edges);
    if (!map.has(idx)) return new Set();
    return map.get(idx)!;
}
export function isClosedLoop(edges: Edges): boolean {
    if (edges.count() < 3) return false;
    let map = neighborMap(edges);

    let start = map.keys().next().value;
    let next = start;
    let nVisited = 0;
    do {
        let neighbors = [...map.get(next)!.values()];
        if (neighbors.length !== 2) return false;
        neighbors = neighbors.filter((n) => n !== start);
        next = neighbors[0];
        nVisited++;
    } while (next !== start);
    return nVisited === edges.count();
}
