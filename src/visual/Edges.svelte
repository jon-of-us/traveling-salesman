<script lang="ts">
    import type { nodePair } from "../data/edges";
    import type { Memory } from "../data/memory";
    import { traceFade } from "../settings";
    import Edge from "./Edge.svelte";

    type StepToRender = nodePair[];

    export let stepsToRender: StepToRender[];
    export let memory: Memory;
</script>

{#each stepsToRender as edgeIterator, index}
    {#each edgeIterator as edge}
        <Edge
            coords={[memory.nodes.get(edge[0]), memory.nodes.get(edge[1])]}
            opacity={Math.pow(traceFade, -index)}
        ></Edge>
    {/each}
{/each}
