<script lang="ts">
    import type { nodePair } from "../data/edges";
    import type { Memory } from "../data/memory";
    import { traceFade, dataTrace } from "../settings";
    import Edge from "./Edge.svelte";

    export let memory: Memory;
    export let renderedStep: number;

    // Get translucent edges from the rendered step
    $: translucentEdges = memory.steps.flat().length > 0
        ? (() => {
              const renderedStepData = memory.steps.flat()[renderedStep];
              return renderedStepData ? [...renderedStepData.edges.all("translucent")] : [];
          })()
        : [];

    // Get normal edges from the rendered step
    $: normalEdges = memory.steps.flat().length > 0
        ? (() => {
              const renderedStepData = memory.steps.flat()[renderedStep];
              return renderedStepData ? [...renderedStepData.edges.all("normal")] : [];
          })()
        : [];

    // Get historical steps for trace fade effect
    $: traceSteps = memory.steps.flat().length > 0
        ? memory.steps
              .flat()
              .slice(
                  Math.max(renderedStep - dataTrace, 0),
                  renderedStep + 1
              )
              .reverse()
              .map((step) => [...step.edges.all()])
        : [];
</script>

<!-- Render translucent edges (background) -->
{#each translucentEdges as edge}
    <Edge
        coords={[
            memory.nodes.getCoords(edge[0]),
            memory.nodes.getCoords(edge[1]),
        ]}
        opacity={0.3}
    ></Edge>
{/each}

<!-- Render normal edges (opaque) -->
{#each normalEdges as edge}
    <Edge
        coords={[
            memory.nodes.getCoords(edge[0]),
            memory.nodes.getCoords(edge[1]),
        ]}
        opacity={1}
    ></Edge>
{/each}

Render all historical steps with trace fade effect
{#each traceSteps as edgeIterator, index}
    {#each edgeIterator as edge}
        <Edge
            coords={[
                memory.nodes.getCoords(edge[0]),
                memory.nodes.getCoords(edge[1]),
            ]}
            opacity={Math.pow(traceFade, -index)}
        ></Edge>
    {/each}
{/each}
