<script lang="ts">
    import type { Main } from "../main";
    import Node from "./Node.svelte";

    export let main: Main;
</script>

{#each main.memory.nodes.all() as point}
    <Node coords={main.memory.nodes.getCoords(point)} />
{/each}
