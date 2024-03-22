<script lang="ts">
    import AlgoButton from "./AlgoButton.svelte";
    import AlgoSelector from "./AlgoSelector.svelte";
    import * as s from "../../settings";
    import {
        initAlgoLabels,
        optimAlgoLabels,
        algoDescription,
    } from "../../algos/algo_utils";
    import type { Main } from "../../main";

    import LengBar from "./LengBar.svelte";

    export let main: Main;
</script>

<div class="container">
    <div title="initialization Algorithm">
        <AlgoSelector
            algoOptions={[...initAlgoLabels]}
            selectedOption={main.selectedAlgos.initAlgo}
            {algoDescription}
            onChange={(label) => main.changeInitAlgo(label)}
        />
    </div>
    {#each main.memory.steps[0] as step}
        <LengBar {step} maxLeng={main.memory.maxLeng} {main} />
    {/each}

    {#each main.selectedAlgos.optimAlgoStack as optim, i}
        <div title="optimization Algorithm">
            <AlgoSelector
                algoOptions={[...optimAlgoLabels]}
                selectedOption={optim}
                {algoDescription}
                onChange={(label) => main.changeOptimAlgo(label, i)}
            />
        </div>
        {#each main.memory.steps[i + 1] as step}
            <LengBar {step} maxLeng={main.memory.maxLeng} {main} />
        {/each}
    {/each}

    {#if main.selectedAlgos.optimAlgoStack.length + 1 <= s.maxStackLen}
        <AlgoButton text="add algorithm" on:click={() => main.addOptimAlgo()} />
    {/if}
    {#if main.selectedAlgos.optimAlgoStack.length > 0}
        <AlgoButton
            text="remove algorithm"
            on:click={() => main.removeOptimAlgo()}
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
