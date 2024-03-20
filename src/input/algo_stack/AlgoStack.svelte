<script lang="ts">
    import AlgoButton from "./AlgoButton.svelte";
    import AlgoSelector from "./AlgoSelector.svelte";
    import * as s from "../../settings";
    import {
        initAlgoLabels,
        optimAlgoLabels,
        algoDescription,
    } from "../../algos/algo_utils";
    import type { Memory } from "../../data/memory";
    import LengBar from "./LengBar.svelte";
    import type { Actions } from "../../App.svelte";
    import type { SelectedAlgos } from "../../algos/selected_algos";

    export let selectedAlgos: SelectedAlgos;
    export let memory: Memory;
    export let actions: Actions;
    export let renderedStep: number;
</script>

<div class="container">
    <div title="initialization Algorithm">
        <AlgoSelector
            algoOptions={[...initAlgoLabels]}
            selectedOption={selectedAlgos.initAlgo}
            {algoDescription}
            onChange={(label) => actions.changeInitAlgo(label)}
        />
    </div>
    {#each memory.steps[0] as step}
        <LengBar {step} maxLeng={memory.maxLeng} {renderedStep} />
    {/each}

    {#each selectedAlgos.optimAlgoStack as optim, i}
        <div title="optimization Algorithm">
            <AlgoSelector
                algoOptions={[...optimAlgoLabels]}
                selectedOption={optim}
                {algoDescription}
                onChange={(label) => actions.changeOptimAlgo(label, i)}
            />
        </div>
        {#each memory.steps[i + 1] as step}
            <LengBar {step} maxLeng={memory.maxLeng} {renderedStep} />
        {/each}
    {/each}

    {#if selectedAlgos.optimAlgoStack.length + 1 <= s.maxStackLen}
        <AlgoButton
            text="add algorithm"
            on:click={() => actions.addOptimAlgo()}
        />
    {/if}
    {#if selectedAlgos.optimAlgoStack.length > 0}
        <AlgoButton
            text="remove algorithm"
            on:click={() => actions.removeOptimAlgo()}
        />
    {/if}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 20px;
    }
</style>
