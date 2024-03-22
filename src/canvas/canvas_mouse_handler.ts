import * as s from "../settings";
import type { Main } from "../main";

export class CanvasMouseHandler {
    moveListenerFunction = undefined as any;
    constructor(private main: Main) {}
    handleMousedown(event: any, width: number, height: number) {
        const rect = event.target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / width;
        const y = (event.clientY - rect.top) / height;
        let nearNodeIdx = this.main.memory.nodes.findNearNode(
            [x, y],
            s.clickNodeRadius / Math.max(width, height)
        );
        if (nearNodeIdx === undefined) {
            this.main.addNode(x, y);
            nearNodeIdx = this.main.memory.nodes.findNearNode(
                [x, y],
                s.clickNodeRadius / Math.max(width, height)
            );
            if (nearNodeIdx === undefined) return;
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
            this.main.moveNode(nodeIdx, [x, y]);
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
