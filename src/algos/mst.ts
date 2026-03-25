import type { Data } from "../data/data";
import type { pointIdx } from "../data/nodes";
import type { nodePair } from "../data/edges";

/**
 * Minimum Spanning Tree (MST) algorithm using Prim's approach.
 * Builds an MST, then converts it to a Hamiltonian cycle via DFS preorder traversal.
 * This provides a 2-approximation for the TSP.
 * MST edges persist as translucent background while the tour is being built.
 */
export function* minimumSpanningTree(data: Data) {
    data.edges.clear();
    let allNodes = [...data.nodes.all()];

    if (allNodes.length === 0) return;
    if (allNodes.length === 1) return;

    // Build MST using Prim's algorithm
    let inMST = new Set<pointIdx>();
    let mstEdges: nodePair[] = [];
    let startNode = allNodes[0];
    inMST.add(startNode);

    while (inMST.size < allNodes.length) {
        let minDist = Infinity;
        let minEdge: [pointIdx, pointIdx] | null = null;

        // Find the minimum edge connecting a node in MST to a node outside
        for (let nodeInMST of inMST) {
            for (let nodeOutside of allNodes) {
                if (!inMST.has(nodeOutside)) {
                    const dist = data.edgeLength([nodeInMST, nodeOutside]);
                    if (dist < minDist) {
                        minDist = dist;
                        minEdge = [nodeInMST, nodeOutside];
                    }
                }
            }
        }

        if (minEdge) {
            data.edges.add(minEdge, "normal"); // Add to normal edges while building
            mstEdges.push(minEdge);
            inMST.add(minEdge[1]);
            yield;
        }
    }

    // Compute tour structure from MST before making it translucent
    const visited = new Set<pointIdx>();
    const tour: pointIdx[] = [];
    const neighbors = data.neighborMap();

    function dfs(node: pointIdx) {
        visited.add(node);
        tour.push(node);
        const nodeNeighbors = neighbors.get(node);
        if (nodeNeighbors) {
            for (let neighbor of nodeNeighbors) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        }
    }

    // Start DFS from the first node
    dfs(startNode);

    // Make MST edges translucent
    for (let edge of mstEdges) {
        data.edges.delete(edge, "normal");
        data.edges.add(edge, "translucent");
    }
    yield;

    // Build Hamiltonian cycle on top of the translucent MST
    if (tour.length > 1) {
        for (let i = 0; i < tour.length; i++) {
            const current = tour[i];
            const next = tour[(i + 1) % tour.length];
            data.edges.add([current, next], "normal"); // Opaque tour edges
            yield;
        }
    }

    // Remove translucent MST edges after tour is complete
    for (let edge of mstEdges) {
        data.edges.delete(edge, "translucent");
    }
    yield;
}
