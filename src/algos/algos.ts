import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";
import { algoFunction, type algoOptions } from "./algotypes";

export type algorithm = (nodes: Nodes, edges: Edges) => void;

export const random: algorithm = (nodes, edges) => {};
export const other: algorithm = (nodes, edges) => {};

export function run(nodes: Nodes, edges: Edges, algoType: algoOptions): void {
    const algoFunc = algoFunction[algoType];
    algoFunc(nodes, edges);
}
