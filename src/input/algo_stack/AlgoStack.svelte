<!-- <script lang="ts">
    import SquareButton from "./SquareButton.svelte";
    import AlgoSelector from "./AlgoSelector.svelte";
    import { maxStackLen } from "../../settings";
    import {
        initAlgoLabels,
        type initAlgoAndLeng,
        optimAlgoLabels,
        type optimAlgoAndLeng,
        algoDescription,
    } from "../../algos/algo_utils";
    import { fontColor } from "../../settings";
    import RunButton from "./RunButton.svelte";

    export let initAlgo: initAlgoAndLeng;
    export let optimAlgoStack: optimAlgoAndLeng[];
    export let run: () => void;

    $: lengs = [initAlgo[1], ...optimAlgoStack.map((o) => o[1])].filter(
        (o) => typeof o == "number"
    ) as number[];
    $: maxLeng = lengs.length == 0 ? "?" : (Math.max(...lengs) as number | "?");

    function addOptimizer() {
        optimAlgoStack.push([optimAlgoLabels[0], "?"]);
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
        bind:selectedOption={initAlgo[0]}
        {algoDescription}
        bind:length={initAlgo[1]}
        bind:maxLeng
    />
    <div style:height={"20px"} />
    <div style:color={fontColor}>optimization Algorithms:</div>
    {#each optimAlgoStack as optim, i}
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
        {#if optimAlgoStack.length > 0}
            <SquareButton text="-" on:click={removeOptimizer} />
        {/if}
        {#if optimAlgoStack.length + 1 <= maxStackLen}
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
</style> -->
