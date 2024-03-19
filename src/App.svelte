<script lang="ts" context="module">
    export interface Actions {
        render(): void;
        addNode(x: number, y: number): void;
        adjustNumberOfNodes(nNodes: number): void;
        runAlgos(): void;
        updateStepsToRender(): void;
        rerenderSidebar(): void;
    }
</script>

<script lang="ts">
    import Input from "./input/Input.svelte";
    import { memoryStore, visualStore } from "./input/input_stores";
    import Canvas from "./canvas/Canvas.svelte";
    import Nodes from "./visual/Nodes.svelte";
    import Edges from "./visual/Edges.svelte";
    import { Memory } from "./data/memory";
    import { dataTrace } from "./settings";
    import { Todo } from "./todo/todo";
    import type { nodePair } from "./data/edges";
    import { AlgoStack } from "./algos/algostack";

    let width: number;
    let height: number;

    let memory = new Memory();
    let algoStack = new AlgoStack();
    /**assign this variable to trigger a rerender*/
    let changeToRerender = 0;
    let stepsToRender: nodePair[][];
    let todo = new Todo();

    /*singleton class */
    const actions: Actions = {
        render() {
            const renderFun = () => {
                changeToRerender += 1;
            };
            todo.add("render", renderFun, 0);
        },
        addNode(x: number, y: number) {
            const addNodeFun = () => {
                memory.nodes.add(x, y);
                this.render();
            };
            todo.add("add node", addNodeFun, 2, false);
        },
        adjustNumberOfNodes(nNodes: number) {
            const adjustNumberOfNodesFun = () => {
                memory.adjustNumberOfNodes(nNodes);
                this.runAlgos();
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
                memory.runAlgos(algoStack.all());
                this.updateStepsToRender();
                this.render();
            };
            todo.add("run algorithms", runAlgosFun, 1);
        },
        updateStepsToRender() {
            const updateStepsToRenderFun = () => {
                stepsToRender = memory.steps
                    .flat()
                    .slice(
                        Math.max($visualStore.renderedStep - dataTrace, 0),
                        $visualStore.renderedStep + 1
                    )
                    .reverse()
                    .map((step) => [...step.edges.all()]);
                this.render();
            };
            todo.add(
                "update the steps which are rendered",
                updateStepsToRenderFun,
                0.5
            );
        },
        rerenderSidebar() {
            const rerenderSidebarFun = () => {
                memory = memory;
            };
            todo.add("render sidebar", rerenderSidebarFun, 0);
        },
        change,
    };

    $: {
        $memoryStore;
        actions.runAlgos();
    }

    actions.adjustNumberOfNodes(30);
    actions.updateStepsToRender();

    // $: {
    //     memory.adjustNumberOfNodes($memoryStore.nPoints);
    //     let algos = [$memoryStore.initAlgo, ...$memoryStore.optimAlgoStack];
    //     memory.runAlgos(algos);
    //     memory = memory;
    // }
    // /**array of all steps which should be rendered.
    //  * For each step an array of all edges.
    //  * Latest step is first element in the array*/
    // $: stepsToRender = memory.steps
    //     .flat()
    //     .slice(
    //         Math.max($visualStore.renderedStep - dataTrace, 0),
    //         $visualStore.renderedStep + 1
    //     )
    //     .reverse()
    //     .map((step) => [...step.edges.all()]);
    // // trigger reactive rerender when stores change
    // $: {
    //     $visualStore;
    //     $memoryStore;
    //     changeToRerender += 1;
    // }

    function handleCanvasClick(event: any) {
        const rect = event.target.getBoundingClientRect();
        const x = (event.clientX - rect.left) / width;
        const y = (event.clientY - rect.top) / height;
        actions.addNode(x, y);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="app">
    <div
        id="canvas"
        bind:clientHeight={height}
        bind:clientWidth={width}
        on:click={handleCanvasClick}
    >
        <Canvas bind:width bind:height>
            {#key changeToRerender}
                <Nodes {memory} />
                <Edges {memory} {stepsToRender} />
            {/key}
        </Canvas>
    </div>
    <div id="input">
        <Input {memory} {actions} />
    </div>
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
