import { Nodes } from "../data/nodes";
import { Edges } from "../data/edges";

export type algorithm = (nodes: Nodes, edges: Edges) => void;

export const random: algorithm = (nodes, edges) => {};
export const other: algorithm = (nodes, edges) => {};
