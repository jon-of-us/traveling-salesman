<script lang="ts">
    import Button from "./Button.svelte";
    import AlgoSelector from "./AlgoSelector.svelte";
    import { maxStackLen } from "./stack_settings";
    import {
        initAlgoLabels,
        type initAlgoLabel,
        optimAlgoLabels,
        type optimAlgoLabel,
        algoDescription,
    } from "../../algos/algo_utils";

    export let initAlgo: initAlgoLabel;
    export let optimAlgoStack: optimAlgoLabel[];

    function addOptimizer() {
        optimAlgoStack.push(optimAlgoLabels[0]);
        optimAlgoStack = optimAlgoStack;
        console.log("push");
    }
    function removeOptimizer() {
        optimAlgoStack.pop();
        optimAlgoStack = optimAlgoStack;
        console.log("pop");
    }
</script>

<div>
    <AlgoSelector
        algoOptions={[...initAlgoLabels.values()]}
        bind:selectedOption={initAlgo}
        {algoDescription}
    />
    {#each optimAlgoLabels as optim}
        <AlgoSelector
            algoOptions={[...optimAlgoLabels.values()]}
            bind:selectedOption={optim}
            {algoDescription}
        />
    {/each}
    {#if optimAlgoStack.length > 0}
        <Button text="-" on:click={removeOptimizer} />
    {/if}
    {#if optimAlgoStack.length + 1 <= maxStackLen}
        <Button text="+" on:click={addOptimizer} />
    {/if}
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
    }
</style>
