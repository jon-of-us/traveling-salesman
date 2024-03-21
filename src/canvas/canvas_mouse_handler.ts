import { Memory } from "../data/memory";
import type { Actions } from "../App.svelte";
import * as s from "../settings";

export class CanvasMouseHandler {
    moveListenerFunction = undefined as any;
    constructor(private actions: Actions, private memory: Memory) {}
    handleMousedown(event: any, width: number, height: number) {
        const rect = event.target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / width;
        const y = (event.clientY - rect.top) / height;
        let nearNodeIdx = this.memory.nodes.findNearNode(
            [x, y],
            s.clickNodeRadius / Math.max(width, height)
        );
        if (nearNodeIdx === undefined) {
            this.actions.addNode(x, y);
            nearNodeIdx = this.memory.nodes.findNearNode(
                [x, y],
                s.clickNodeRadius / Math.max(width, height)
            );
        }
        this.startToDragNode(nearNodeIdx!, width, height);
    }
    startToDragNode(nodeIdx: number, width: number, height: number) {
        if (this.moveListenerFunction !== undefined) {
            this.stopToDragNode();
        }
        this.moveListenerFunction = (event: any) => {
            const rect = event.target.getBoundingClientRect();
            const x = (event.clientX - rect.left) / width;
            const y = (event.clientY - rect.top) / height;
            this.actions.moveNode(nodeIdx, [x, y]);
        };
        window.addEventListener("mousemove", this.moveListenerFunction);
    }
    stopToDragNode() {
        if (this.moveListenerFunction === undefined) return;
        window.removeEventListener("mousemove", this.moveListenerFunction);
    }
    handleMouseup() {
        this.stopToDragNode();
    }
    handleMouseLeave() {
        this.stopToDragNode();
    }
}
