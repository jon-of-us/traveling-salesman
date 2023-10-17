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
    import { fontColor } from "../../global_settings";
    import { input_store } from "../input_store";

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

<div class="container">
    <div style:color={fontColor}>initialization Algorithm:</div>
    <AlgoSelector
        algoOptions={[...initAlgoLabels.values()]}
        bind:selectedOption={initAlgo}
        {algoDescription}
        length={$input_store.length[0]}
    />
    <div style:color={fontColor}>optimization Algorithms:</div>
    {#each optimAlgoStack as optim, i}
        <AlgoSelector
            algoOptions={[...optimAlgoLabels.values()]}
            bind:selectedOption={optim}
            {algoDescription}
            length={$input_store.length[i + 1]}
        />
    {/each}
    <div class="buttons">
        {#if optimAlgoStack.length > 0}
            <Button text="-" on:click={removeOptimizer} />
        {/if}
        {#if optimAlgoStack.length + 1 <= maxStackLen}
            <Button text="+" on:click={addOptimizer} />
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
