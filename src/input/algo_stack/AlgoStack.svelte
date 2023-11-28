<script lang="ts">
    import AlgoButton from "./AlgoButton.svelte";
    import AlgoSelector from "./AlgoSelector.svelte";
    import * as s from "../../settings";
    import {
        initAlgoLabels,
        type initAlgoLabel,
        optimAlgoLabels,
        type optimAlgoLabel,
        algoDescription,
    } from "../../algos/algo_utils";
    import type { Memory } from "../../data/memory";
    import LengBar from "./LengBar.svelte";
    import { input_store } from "../input_store";

    export let initAlgo: initAlgoLabel;
    export let optimAlgoStack: optimAlgoLabel[];
    export let memory: Memory;

    function addOptimizer() {
        optimAlgoStack.push(optimAlgoLabels[0]);
        optimAlgoStack = optimAlgoStack;
    }
    function removeOptimizer() {
        optimAlgoStack.pop();
        optimAlgoStack = optimAlgoStack;
    }
</script>

<div class="container">
    <div title="initialization Algorithm">
        <AlgoSelector
            algoOptions={[...initAlgoLabels.values()]}
            bind:selectedOption={initAlgo}
            {algoDescription}
        />
    </div>
    {#each memory.steps[0] as step}
        <LengBar {step} maxLeng={memory.maxLeng} />
    {/each}

    {#each optimAlgoStack as optim, i}
        <div title="optimization Algorithm">
            <AlgoSelector
                algoOptions={[...optimAlgoLabels.values()]}
                bind:selectedOption={optim}
                {algoDescription}
            />
        </div>
        {#each memory.steps[i + 1] as step}
            <LengBar {step} maxLeng={memory.maxLeng} />
        {/each}
    {/each}

    {#if optimAlgoStack.length + 1 <= s.maxStackLen}
        <AlgoButton text="add algorithm" on:click={addOptimizer} />
    {/if}
    {#if optimAlgoStack.length > 0}
        <AlgoButton text="remove algorithm" on:click={removeOptimizer} />
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
