<script lang="ts">
    import type { Memory } from "../data/memory";
    import Node from "./Node.svelte";

    export let memory: Memory;
</script>

{#each memory.nodes.all() as point}
    <Node coords={memory.nodes.getCoords(point)} />
{/each}
