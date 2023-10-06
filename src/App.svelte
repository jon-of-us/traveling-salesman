<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import Node from "./visual/Nodes.svelte";
    import { Nodes } from "./data/nodes";
    import { adjustNumberOfNodes } from "./data/node_utils";
    import { Edges } from "./data/edges";
    import { run } from "./algos/algos";

    let nodes = new Nodes();
    let edges = new Edges();
    run(nodes, edges, $input_store.starterAlgo);
    $: {
        adjustNumberOfNodes(nodes, $input_store.nPoints);
        nodes = nodes;
    }
</script>

<div id="app">
    <Input />
    <Canvas>
        {#each nodes.all() as point}
            <Node coords={nodes.get(point)} />
        {/each}
    </Canvas>
</div>
