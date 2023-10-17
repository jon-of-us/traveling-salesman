<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import Node from "./visual/Node.svelte";
    import Edge from "./visual/Edge.svelte";
    import { runAll, runStep } from "./algos/algo_utils";
    import { Data } from "./data/data";

    let width: number;
    let height: number;

    let data = new Data();
    $: {
        data.adjustNumberOfNodes($input_store.nPoints);
        runAll(data, "random");
        data = data;
    }
</script>

<div id="app">
    <div id="canvas" bind:clientHeight={height} bind:clientWidth={width}>
        <Canvas bind:width bind:height>
            {#each data.nodes.all() as point}
                <Node coords={data.nodes.get(point)} />
            {/each}
            {#each data.edges.all() as edge}
                <Edge
                    coords={[data.nodes.get(edge[0]), data.nodes.get(edge[1])]}
                />
            {/each}
        </Canvas>
    </div>
    <div id="input">
        <Input />
    </div>
</div>

<style>
    #app {
        position: absolute;
        width: 100%;
        height: 100%;
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
