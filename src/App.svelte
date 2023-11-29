<script lang="ts">
    import Input from "./input/Input.svelte";
    import { memoryStore, visualStore } from "./input/input_stores";
    import Canvas from "./canvas/Canvas.svelte";
    import Nodes from "./visual/Nodes.svelte";
    import Edges from "./visual/Edges.svelte";
    import { Layer } from "svelte-canvas";
    import { Memory } from "./data/memory";
    import { dataTrace } from "./settings";

    let width: number;
    let height: number;

    let memory = new Memory();
    /**assign this variable to trigger a rerender*/
    let changeToRerender = 0;
    $: {
        memory.adjustNumberOfNodes($memoryStore.nPoints);
        let algos = [$memoryStore.initAlgo, ...$memoryStore.optimAlgoStack];
        memory.runAlgos(algos);
        memory = memory;
    }
    /**array of all steps which should be rendered.
     * For each step an array of all edges.
     * Latest step is first element in the array*/
    $: stepsToRender = memory.steps
        .flat()
        .slice(
            Math.max($visualStore.renderedStep - dataTrace, 0),
            $visualStore.renderedStep + 1
        )
        .reverse()
        .map((step) => [...step.edges.all()]);
    // trigger reactive rerender when stores change
    $: {
        $visualStore;
        $memoryStore;
        changeToRerender += 1;
    }
</script>

<div id="app">
    <div id="canvas" bind:clientHeight={height} bind:clientWidth={width}>
        <Canvas bind:width bind:height>
            {#key changeToRerender}
                <Nodes {memory} />
                <Edges {memory} {stepsToRender} />
            {/key}
        </Canvas>
    </div>
    <div id="input">
        <Input {memory} />
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
    }
</style>
