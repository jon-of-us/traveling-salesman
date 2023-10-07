import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";

/**simple number hash */
function hash(n: number) {
    return (n * 2654435761) % 2 ** 32;
}

export function* random(nodes: Nodes, edges: Edges) {
    let allNodesRandom = [...nodes.all()].sort((a, b) => hash(a) - hash(b));
    edges.clear();
    let e = [];
    for (let i = 0; i < allNodesRandom.length; i++) {
        e.push([
            allNodesRandom[i],
            allNodesRandom[(i + 1) % allNodesRandom.length],
        ]);
        edges.add([
            allNodesRandom[i],
            allNodesRandom[(i + 1) % allNodesRandom.length],
        ]);
        yield;
    }
}
