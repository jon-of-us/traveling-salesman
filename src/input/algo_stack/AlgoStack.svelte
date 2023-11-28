<script lang="ts">
    import SquareButton from "./SquareButton.svelte";
    import AlgoSelector from "./AlgoSelector.svelte";
    import { maxStackLen } from "../../settings";
    import {
        initAlgoLabels,
        type initAlgoLabel,
        optimAlgoLabels,
        type optimAlgoLabel,
        algoDescription,
    } from "../../algos/algo_utils";
    import { fontColor } from "../../settings";
    import type { Memory } from "../../data/memory";
    import LengBar from "./LengBar.svelte";

    export let initAlgo: initAlgoLabel;
    export let optimAlgoStack: optimAlgoLabel[];
    export let memory: Memory;
    $: maxLeng = Math.max();

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
    <div style:color={fontColor}>initialization Algorithm:</div>
    <AlgoSelector
        algoOptions={[...initAlgoLabels.values()]}
        bind:selectedOption={initAlgo}
        {algoDescription}
    />
    {#each memory.steps as stepArray}
        {#each stepArray as step}
            <LengBar length={step.len} {maxLeng} />
        {/each}
    {/each}

    <div style:height={"20px"} />
    <div style:color={fontColor}>optimization Algorithms:</div>
    {#each optimAlgoStack as optim, i}
        <AlgoSelector
            algoOptions={[...optimAlgoLabels.values()]}
            bind:selectedOption={optim}
            {algoDescription}
        />
    {/each}

    <div style:height={"15px"} />
    <div class="buttons">
        {#if optimAlgoStack.length > 0}
            <SquareButton text="-" on:click={removeOptimizer} />
        {/if}
        {#if optimAlgoStack.length + 1 <= maxStackLen}
            <SquareButton text="+" on:click={addOptimizer} />
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .buttons {
        display: flex;
        flex-direction: row;
    }
</style>
