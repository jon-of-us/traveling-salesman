<script lang="ts">
    import Button from "./Button.svelte";
    import AlgoSelector from "./AlgoSelector.svelte";
    import { maxStackLen } from "./stack_settings";
    import {
        initAlgoLabels,
        type initAlgoAndLeng,
        optimAlgoLabels,
        type optimAlgoAndLeng,
        algoDescription,
    } from "../../algos/algo_utils";
    import { fontColor } from "../../global_settings";

    export let initAlgoAndLeng: initAlgoAndLeng;
    export let optimAlgoAndLengStack: optimAlgoAndLeng[];

    $: lengs = [
        initAlgoAndLeng[1],
        ...optimAlgoAndLengStack.map((o) => o[1]),
    ].filter((o) => typeof o == "number") as number[];
    $: maxLeng = lengs.length == 0 ? "?" : (Math.max(...lengs) as number | "?");

    function addOptimizer() {
        optimAlgoAndLengStack.push([optimAlgoLabels[0], "?"]);
        optimAlgoAndLengStack = optimAlgoAndLengStack;
        console.log("push");
    }
    function removeOptimizer() {
        optimAlgoAndLengStack.pop();
        optimAlgoAndLengStack = optimAlgoAndLengStack;
        console.log("pop");
    }
</script>

<div class="container">
    <div style:color={fontColor}>initialization Algorithm:</div>
    <AlgoSelector
        algoOptions={[...initAlgoLabels.values()]}
        bind:selectedOption={initAlgoAndLeng[0]}
        {algoDescription}
        bind:length={initAlgoAndLeng[1]}
        bind:maxLeng
    />
    <div style:color={fontColor}>optimization Algorithms:</div>
    {#each optimAlgoAndLengStack as optim, i}
        <AlgoSelector
            algoOptions={[...optimAlgoLabels.values()]}
            bind:selectedOption={optim[0]}
            {algoDescription}
            bind:length={optim[1]}
            bind:maxLeng
        />
    {/each}
    <div class="buttons">
        {#if optimAlgoAndLengStack.length > 0}
            <Button text="-" on:click={removeOptimizer} />
        {/if}
        {#if optimAlgoAndLengStack.length + 1 <= maxStackLen}
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
