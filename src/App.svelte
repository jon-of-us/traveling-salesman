<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import Node from "./visual/Node.svelte";
    import Edge from "./visual/Edge.svelte";
    import { runAll, runStep } from "./algos/algo_utils";
    import { algoLabels } from "./algos/algo_utils";
    import { Data } from "./data/data";

    let innerWidth: number;
    let innerHeight: number;
    $: width = innerWidth - 17;
    $: height = innerHeight - 17;

    let data = new Data();
    $: {
        data.adjustNumberOfNodes($input_store.nPoints);
        runAll(data, algoLabels.shortestEdge);
        // runAll(data, algoLabels.nextNeighbor);
        runAll(data, algoLabels.twoOpt);
        data = data;
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div id="app">
    <Input />
    <Canvas bind:width bind:height>
        {#each data.nodes.all() as point}
            <Node coords={data.nodes.get(point)} />
        {/each}
        {#each data.edges.all() as edge}
            <Edge coords={[data.nodes.get(edge[0]), data.nodes.get(edge[1])]} />
        {/each}
    </Canvas>
</div>
