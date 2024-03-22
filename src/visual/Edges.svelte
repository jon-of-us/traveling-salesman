<script lang="ts">
    import type { Main } from "../main";
    import { traceFade } from "../settings";
    import Edge from "./Edge.svelte";
    import * as s from "../settings";

    export let main: Main;
</script>

{#each main.stepsToRender as edgeIterator, index}
    {#each edgeIterator as edge}
        <Edge
            coords={[
                main.memory.nodes.getCoords(edge[0]),
                main.memory.nodes.getCoords(edge[1]),
            ]}
            opacity={Math.pow(traceFade, -index)}
        ></Edge>
    {/each}
{/each}
