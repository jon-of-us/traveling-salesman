<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import Node from "./visual/Node.svelte";
    import { Nodes, addRandomNodes } from "./data/nodes";

    let nodes = new Nodes();
    addRandomNodes(nodes, $input_store.nPoints);
</script>

<div id="app">
    <Input />
    <Canvas>
        {#each nodes.all() as point}
            <Node coords={nodes.get(point)} />
        {/each}
    </Canvas>
</div>
