/** between 0 and 1 */
export type pointCoords = [x: number, y: number];
export type pointIdx = number;

/** every node is identified by a unique index */
export class Nodes {
    nextIdx = 0;
    nodes = new Map<number, pointCoords>();

    /** x and y should be betwenn 0 and 1 */
    add(x: number, y: number): void {
        this.nodes.set(this.nextIdx, [x, y]);
        this.nextIdx++;
    }
    setCoords(idx: pointIdx, coords: pointCoords): void {
        if (!this.nodes.has(idx)) throw new Error(`node ${idx} not found`);
        this.nodes.set(idx, coords);
    }
    get(idx: pointIdx): pointCoords {
        let val = this.nodes.get(idx);
        if (val === undefined) {
            throw new Error(`node ${idx} not found`);
        }
        return val;
    }
    delete(idx: pointIdx): void {
        this.nodes.delete(idx);
    }
    count(): number {
        return this.nodes.size;
    }
    all(): IterableIterator<pointIdx> {
        return this.nodes.keys();
    }
}
