import { Nodes } from "./nodes";

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
