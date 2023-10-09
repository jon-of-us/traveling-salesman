import type { Data } from "../data/data";

/**simple number hash */
function hash(n: number) {
    return (n * 2654435761) % 2 ** 32;
}

export function* random(data: Data) {
    let allNodesRandom = [...data.nodes.all()].sort(
        (a, b) => hash(a) - hash(b)
    );
    data.edges.clear();
    let e = [];
    for (let i = 0; i < allNodesRandom.length; i++) {
        e.push([
            allNodesRandom[i],
            allNodesRandom[(i + 1) % allNodesRandom.length],
        ]);
        data.edges.add([
            allNodesRandom[i],
            allNodesRandom[(i + 1) % allNodesRandom.length],
        ]);
        yield;
    }
}
