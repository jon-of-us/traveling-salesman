<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import Node from "./visual/Node.svelte";
    import Edge from "./visual/Edge.svelte";
    import { Layer } from "svelte-canvas";
    import { Memory } from "./data/memory";
    import { dataTrace } from "./global_settings";
    import Edges from "./visual/Edges.svelte";
    import { Nodes } from "./data/nodes";

    let width: number;
    let height: number;
    let nodes = new Nodes();

    let memory = new Memory();
    let runs = 0;
    $: {
        memory.adjustNumberOfNodes($input_store.nPoints);
        let algos = [$input_store.initAlgo, ...$input_store.optimAlgoStack];
        memory.runAlgos(algos);
        memory = memory;
        runs += 1;
    }
    let edgesToRender = memory.steps
        .flat()
        .slice(
            Math.max($input_store.renderedStep - dataTrace, 0),
            $input_store.renderedStep + 1
        )
        .map((step) => step.edges);
    $: {
        edgesToRender = memory.steps
            .flat()
            .slice(
                Math.max($input_store.renderedStep - dataTrace, 0),
                $input_store.renderedStep + 1
            )
            .map((step) => step.edges);
        console.log(edgesToRender);
    }
</script>

<div id="app">
    <div id="canvas" bind:clientHeight={height} bind:clientWidth={width}>
        <Canvas bind:width bind:height>
            {#each memory.nodes.all() as point}
                <Node coords={memory.nodes.get(point)} />
            {/each}

            <Edges {memory} edges={edgesToRender[0]} />

            <Layer
                render={({ context }) => {
                    runs;
                }}
            />
        </Canvas>
    </div>
    <div id="input">
        <Input />
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
