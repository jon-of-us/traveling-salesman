<script lang="ts">
    import { Layer } from "svelte-canvas";
    import type { Edges } from "../data/edges";
    import type { Memory } from "../data/memory";
    import Edge from "./Edge.svelte";

    export let edges: Edges;
    export let memory: Memory;
</script>

<!-- {#each edges.all() as edge} -->
<!-- <Edge
        coords={[
            [0, 0],
            [0, 0],
        ]}
    /> -->
<Layer
    render={({ context }) => {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(100, 100);
        context.stroke();
    }}
/>
<!-- {/each} -->
