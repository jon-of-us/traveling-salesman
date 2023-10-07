import { Nodes } from "./nodes";
import { type nodePair } from "./edges";
import { Edges } from "./edges";
export function addRandomNodes(nodes: Nodes, number = 1): void {
    for (let i = 0; i < number; i++) {
        nodes.add(Math.random(), Math.random());
    }
}
export function adjustNumberOfNodes(nodes: Nodes, number: number): void {
    if (nodes.count() < number) {
        addRandomNodes(nodes, number - nodes.count());
    } else if (nodes.count() > number) {
        // delete last values
        let values = [...nodes.all()].slice(number);
        for (let value of values) {
            nodes.delete(value);
        }
    }
}
export function length(pair: nodePair, nodes: Nodes): number {
    const [x1, y1] = nodes.get(pair[0]);
    const [x2, y2] = nodes.get(pair[1]);
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
export function totalLength(edges: Edges, nodes: Nodes): number {
    let sum = 0;
    for (let pair of edges.all()) {
        sum += length(pair, nodes);
    }
    return sum;
}
