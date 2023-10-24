<script lang="ts">
    import SquareButton from "./SquareButton.svelte";
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
    import RunButton from "./RunButton.svelte";

    export let initAlgoAndLeng: initAlgoAndLeng;
    export let optimAlgoAndLengStack: optimAlgoAndLeng[];
    export let run: () => void;

    $: lengs = [
        initAlgoAndLeng[1],
        ...optimAlgoAndLengStack.map((o) => o[1]),
    ].filter((o) => typeof o == "number") as number[];
    $: maxLeng = lengs.length == 0 ? "?" : (Math.max(...lengs) as number | "?");

    function addOptimizer() {
        optimAlgoAndLengStack.push([optimAlgoLabels[0], "?"]);
        optimAlgoAndLengStack = optimAlgoAndLengStack;
    }
    function removeOptimizer() {
        optimAlgoAndLengStack.pop();
        optimAlgoAndLengStack = optimAlgoAndLengStack;
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
    <div style:height={"20px"} />
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
    <div style:height={"15px"} />
    <div class="buttons">
        {#if optimAlgoAndLengStack.length > 0}
            <SquareButton text="-" on:click={removeOptimizer} />
        {/if}
        {#if optimAlgoAndLengStack.length + 1 <= maxStackLen}
            <SquareButton text="+" on:click={addOptimizer} />
        {/if}
        <RunButton {run} />
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
