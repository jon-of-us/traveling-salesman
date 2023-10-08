<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import Node from "./visual/Node.svelte";
    import Edge from "./visual/Edge.svelte";
    import { Nodes } from "./data/nodes";
    import { adjustNumberOfNodes } from "./data/data_utils";
    import { Edges } from "./data/edges";
    import { runAll, runStep } from "./algos/algo_utils";
    import { algoLabels } from "./algos/algo_utils";

    let nodes = new Nodes();
    let edges = new Edges();
    $: {
        adjustNumberOfNodes(nodes, $input_store.nPoints);
        runAll(nodes, edges, $input_store.starterAlgo);
        runAll(nodes, edges, algoLabels.nextNeighbor);
        runAll(nodes, edges, algoLabels.twoOpt);
        nodes = nodes;
        edges = edges;
    }
</script>

<div id="app">
    <Input />
    <Canvas>
        {#each nodes.all() as point}
            <Node coords={nodes.get(point)} />
        {/each}
        {#each edges.all() as edge}
            <Edge coords={[nodes.get(edge[0]), nodes.get(edge[1])]} />
        {/each}
    </Canvas>
</div>
