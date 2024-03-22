import { SelectedAlgos } from "./algos/selected_algos";
import { Memory } from "./data/memory";
import { Todo } from "./todo/todo";
import {
    optimAlgoLabels,
    type initAlgoLabel,
    type optimAlgoLabel,
} from "./algos/algo_utils";
import * as s from "./settings";
import type { nodePair } from "./data/edges";

export class Main {
    memory = new Memory();
    selectedAlgos = new SelectedAlgos();
    virtualScroll = 0.999;
    todo = new Todo();

    renderedStep = 0;
    stepsToRender: nodePair[][] = [];

    constructor(
        public renderCanvasCallback: () => void,
        public renderInputCallback: () => void
    ) {
        this.adjustNumberOfNodes(30);
        this.renderInput();
        this.renderCanvas();
        this.todo.doAll();
    }
    renderCanvas() {
        const renderFun = () => {
            this.renderCanvasCallback();
        };
        this.todo.add("render", renderFun, 0);
    }
    addNode(x: number, y: number) {
        const addNodeFun = () => {
            if (this.memory.nodes.count() >= s.maxNodes) return;
            this.memory.nodes.add(x, y);
            this.runAlgos();
            this.updateRenderedStep();
        };
        this.todo.add("add node", addNodeFun, 2, false);
    }
    adjustNumberOfNodes(nNodes: number) {
        const adjustNumberOfNodesFun = () => {
            this.memory.adjustNumberOfNodes(nNodes);
            this.runAlgos();
            this.updateRenderedStep();
        };
        this.todo.add(
            "adjust number of nodes",
            adjustNumberOfNodesFun,
            2.1,
            false
        );
    }
    runAlgos() {
        const runAlgosFun = () => {
            this.memory.runAlgos(this.selectedAlgos.all());
            this.renderInput();
            this.updateStepsToRender();
            this.updateRenderedStep();
        };
        this.todo.add("run algorithms", runAlgosFun, 1);
    }
    renderInput() {
        const rerenderSidebarFun = () => {
            this.renderInputCallback();
        };
        this.todo.add("render sidebar", rerenderSidebarFun, 0);
    }
    changeInitAlgo(label: initAlgoLabel) {
        const changeInitAlgoFun = () => {
            this.selectedAlgos.initAlgo = label;
            this.runAlgos();
        };
        this.todo.add("change init algo", changeInitAlgoFun, 2.2, false);
    }
    changeOptimAlgo(label: optimAlgoLabel, index: number) {
        const changeOptimAlgoFun = () => {
            this.selectedAlgos.optimAlgoStack[index] = label;
            this.runAlgos();
        };
        this.todo.add("change optim algo", changeOptimAlgoFun, 2.2, false);
    }
    addOptimAlgo() {
        const addOptimAlgoFun = () => {
            this.selectedAlgos.optimAlgoStack.push(optimAlgoLabels[0]);
            this.runAlgos();
            this.renderInput();
            this.updateRenderedStep();
        };
        this.todo.add("add optim algo", addOptimAlgoFun, 2.3, false);
    }
    removeOptimAlgo() {
        const removeOptimAlgoFun = () => {
            this.selectedAlgos.optimAlgoStack.pop();
            this.runAlgos();
            this.renderInput();
        };
        this.todo.add("remove optim algo", removeOptimAlgoFun, 2.3, false);
    }
    setVirtualScroll(scroll: number) {
        const setVirtualScrollFun = () => {
            this.virtualScroll = scroll;
            this.updateRenderedStep();
        };
        this.todo.add("set virtual scroll", setVirtualScrollFun, 0.6);
    }
    moveNode(node: number, position: [number, number]) {
        const moveNodeFun = () => {
            this.memory.nodes.setCoords(node, position);
            this.runAlgos();
        };
        this.todo.add("move node", moveNodeFun, 2.4, false);
    }
    updateRenderedStep() {
        const setRenderedStepFun = () => {
            const oldRenderedStep = this.renderedStep;
            this.renderedStep = Math.floor(
                this.memory.nSteps * this.virtualScroll
            );
            if (oldRenderedStep !== this.renderedStep) {
                this.renderInput();
                this.updateStepsToRender();
            }
        };
        this.todo.add("set rendered step", setRenderedStepFun, 0.6);
    }
    updateStepsToRender() {
        const updateStepsToRenderFun = () => {
            this.stepsToRender = this.memory.steps
                .flat()
                .slice(
                    Math.max(this.renderedStep - s.dataTrace, 0),
                    this.renderedStep + 1
                )
                .reverse()
                .map((step) => [...step.edges.all()]);
            this.renderCanvas();
        };
        this.todo.add(
            "update the steps which are rendered",
            updateStepsToRenderFun,
            0.5
        );
    }
}
