<script lang="ts">
    import SquareButton from "./SquareButton.svelte";
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
    <!-- <div
        class="text"
        style:color={fontColor}
        style:margin={s.buttonMargin.px()}
    >
        initialization Algorithm:
    </div> -->
    <div title="initialization Algorithm">
        <AlgoSelector
            algoOptions={[...initAlgoLabels.values()]}
            bind:selectedOption={initAlgo}
            {algoDescription}
        />
    </div>
    {#each memory.steps[0] as step}
        <LengBar length={step.len} maxLeng={memory.maxLeng} />
    {/each}
    <!-- <div style:color={fontColor} style:margin={s.buttonMargin.px()}>
        optimization Algorithms:
    </div> -->
    {#each optimAlgoStack as optim, i}
        <div title="optimization Algorithm">
            <AlgoSelector
                algoOptions={[...optimAlgoLabels.values()]}
                bind:selectedOption={optim}
                {algoDescription}
            />
        </div>
        {#each memory.steps[i + 1] as step}
            <LengBar length={step.len} maxLeng={memory.maxLeng} />
        {/each}
    {/each}

    <div class="buttons" style:margin={s.buttonMargin.px()}>
        <div style:flex="1" />
        {#if optimAlgoStack.length > 0}
            <SquareButton text="-" on:click={removeOptimizer} />
        {/if}
        {#if optimAlgoStack.length + 1 <= s.maxStackLen}
            <SquareButton text="+" on:click={addOptimizer} />
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 20px;
    }
    .buttons {
        display: flex;
        flex-direction: row;
    }
</style>
