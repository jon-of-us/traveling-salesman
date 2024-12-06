<script lang="ts" context="module">
    export interface Actions {
        render(): void;
        addNode(x: number, y: number): void;
        adjustNumberOfNodes(nNodes: number): void;
        runAlgos(): void;
        updateStepsToRender(): void;
        renderSidebar(): void;
        changeInitAlgo(label: initAlgoLabel): void;
        changeOptimAlgo(label: optimAlgoLabel, index: number): void;
        addOptimAlgo(): void;
        removeOptimAlgo(): void;
        updateRenderedStep(): void;
        setVirtualScroll(scroll: number): void;
        moveNode(node: number, position: [number, number]): void;
    }
</script>

<script lang="ts">
    import Input from "./input/Input.svelte";
    import Canvas from "./canvas/Canvas.svelte";
    import Nodes from "./visual/Nodes.svelte";
    import Edges from "./visual/Edges.svelte";
    import { Memory } from "./data/memory";
    import { dataTrace } from "./settings";
    import { Todo } from "./todo/todo";
    import type { nodePair } from "./data/edges";
    import { SelectedAlgos } from "./algos/selected_algos";
    import {
        optimAlgoLabels,
        type initAlgoLabel,
        type optimAlgoLabel,
    } from "./algos/algo_utils";
    import { CanvasMouseHandler } from "./canvas/canvas_mouse_handler";
    import * as s from "./settings";
    import Infobutton from "./visual/Infobutton.svelte";

    let width: number;
    let height: number;

    let memory = new Memory();
    const selectedAlgos = new SelectedAlgos();
    let virtualScroll = 0.999;

    let renderedStep = 0;
    /**assign this variable to trigger a rerender*/
    let changeToRerender = 0;
    let stepsToRender: nodePair[][];
    let todo = new Todo();

    const actions: Actions = {
        render() {
            const renderFun = () => {
                changeToRerender += 1;
            };
            todo.add("render", renderFun, 0);
        },
        addNode(x: number, y: number) {
            const addNodeFun = () => {
                if (memory.nodes.count() >= s.maxNodes) return;
                memory.nodes.add(x, y);
                this.runAlgos();
                this.updateRenderedStep();
            };
            todo.add("add node", addNodeFun, 2, false);
        },
        adjustNumberOfNodes(nNodes: number) {
            const adjustNumberOfNodesFun = () => {
                memory.adjustNumberOfNodes(nNodes);
                this.runAlgos();
                this.updateRenderedStep();
            };
            todo.add(
                "adjust number of nodes",
                adjustNumberOfNodesFun,
                2.1,
                false
            );
        },
        runAlgos() {
            const runAlgosFun = () => {
                memory.runAlgos(selectedAlgos.all());
                this.renderSidebar();
                this.updateStepsToRender();
            };
            todo.add("run algorithms", runAlgosFun, 1);
        },
        updateStepsToRender() {
            const updateStepsToRenderFun = () => {
                stepsToRender = memory.steps
                    .flat()
                    .slice(
                        Math.max(renderedStep - dataTrace, 0),
                        renderedStep + 1
                    )
                    .reverse()
                    .map((step) => [...step.edges.all()]);
                this.updateRenderedStep();
                this.render();
            };
            todo.add(
                "update the steps which are rendered",
                updateStepsToRenderFun,
                0.5
            );
        },
        renderSidebar() {
            const rerenderSidebarFun = () => {
                memory = memory;
            };
            todo.add("render sidebar", rerenderSidebarFun, 0);
        },
        changeInitAlgo(label: initAlgoLabel) {
            const changeInitAlgoFun = () => {
                selectedAlgos.initAlgo = label;
                this.runAlgos();
            };
            todo.add("change init algo", changeInitAlgoFun, 2.2, false);
        },
        changeOptimAlgo(label: optimAlgoLabel, index: number) {
            const changeOptimAlgoFun = () => {
                selectedAlgos.optimAlgoStack[index] = label;
                this.runAlgos();
            };
            todo.add("change optim algo", changeOptimAlgoFun, 2.2, false);
        },
        addOptimAlgo() {
            const addOptimAlgoFun = () => {
                selectedAlgos.optimAlgoStack.push(optimAlgoLabels[0]);
                this.runAlgos();
                this.renderSidebar();
                this.updateRenderedStep();
            };
            todo.add("add optim algo", addOptimAlgoFun, 2.3, false);
        },
        removeOptimAlgo() {
            const removeOptimAlgoFun = () => {
                selectedAlgos.optimAlgoStack.pop();
                this.runAlgos();
                this.renderSidebar();
                this.updateRenderedStep();
            };
            todo.add("remove optim algo", removeOptimAlgoFun, 2.3, false);
        },
        setVirtualScroll(scroll: number) {
            const setVirtualScrollFun = () => {
                virtualScroll = scroll;
                this.updateRenderedStep();
            };
            todo.add("set virtual scroll", setVirtualScrollFun, 0.6);
        },
        updateRenderedStep() {
            const setRenderedStepFun = () => {
                const oldRenderedStep = renderedStep;
                renderedStep = Math.floor(memory.nSteps * virtualScroll);
                if (oldRenderedStep !== renderedStep) {
                    this.renderSidebar();
                    this.updateStepsToRender();
                }
            };
            todo.add("set rendered step", setRenderedStepFun, 0.6);
        },
        moveNode(node: number, position: [number, number]) {
            const moveNodeFun = () => {
                memory.nodes.setCoords(node, position);
                this.runAlgos();
                this.updateRenderedStep();
            };
            todo.add("move node", moveNodeFun, 2.4, false);
        },
    };

    actions.adjustNumberOfNodes(30);
    renderedStep = memory.nSteps - 1;
    actions.updateStepsToRender();
    actions.renderSidebar();

    const canvasMouseHandler = new CanvasMouseHandler(actions, memory);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="app">
    <div
        id="canvas"
        bind:clientHeight={height}
        bind:clientWidth={width}
        on:mousedown={(e) =>
            canvasMouseHandler.handleMousedown(e, width, height)}
        on:mouseup={() => {
            canvasMouseHandler.handleMouseup();
        }}
        on:mouseleave={() => canvasMouseHandler.handleMouseLeave()}
    >
        <Canvas bind:width bind:height>
            {#key changeToRerender}
                <Nodes {memory} />
                <Edges {memory} {stepsToRender} />
            {/key}
        </Canvas>
    </div>
    <div id="input">
        <Input {memory} {actions} {selectedAlgos} {renderedStep} />
    </div>
    <Infobutton />
</div>

<style>
    #app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }
    #canvas {
        border-style: border-box;
        margin: 15px;
        flex: 1;
        overflow: hidden;
    }
</style>
