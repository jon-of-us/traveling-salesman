import { Nodes, type pointIdx } from "./nodes";
import { Edges, type nodePair } from "./edges";

export class Data {
    edges = new Edges();

    constructor(public nodes = new Nodes()) {}

    edgeLength(edge: nodePair): number {
        const [x1, y1] = this.nodes.get(edge[0]);
        const [x2, y2] = this.nodes.get(edge[1]);
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }
    totalLength(): number {
        let sum = 0;
        for (let edge of this.edges.all()) {
            sum += this.edgeLength(edge);
        }
        return sum;
    }
    neighborMap(): Map<pointIdx, Set<pointIdx>> {
        let map = new Map<pointIdx, Set<pointIdx>>();
        for (let [a, b] of this.edges.all()) {
            if (!map.has(a)) map.set(a, new Set());
            if (!map.has(b)) map.set(b, new Set());
            map.get(a)?.add(b);
            map.get(b)?.add(a);
        }
        return map;
    }
    neighbors(idx: pointIdx): Set<pointIdx> {
        let neighbors = new Set<pointIdx>();
        for (let [a, b] of this.edges.all()) {
            if (a === idx) neighbors.add(b);
            if (b === idx) neighbors.add(a);
        }
        return neighbors;
    }
    isClosedLoop(): boolean {
        if (this.edges.count() < 3) return false;
        let map = this.neighborMap();

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
        } while (next !== start && nVisited <= this.edges.count() + 1);
        return nVisited === this.edges.count();
    }
}
