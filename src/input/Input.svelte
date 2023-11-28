<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
    import * as s from "../settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";
    import type { Memory } from "../data/memory";
    import { onMount } from "svelte";

    export let memory: Memory;

    let container: HTMLDivElement;
    onMount(() => {
        container.addEventListener("wheel", changeRenderdStepOnScroll);
    });

    function changeRenderdStepOnScroll(e: WheelEvent) {
        let newStep = $input_store.renderedStep + Math.sign(e.deltaY);
        newStep = Math.max(0, newStep);
        const totalSteps = memory.steps.reduce(
            (prev, step) => prev + step.length,
            0
        );
        newStep = Math.min(totalSteps - 1, newStep);
        $input_store.renderedStep = newStep;
    }
</script>

<div class="container" style:width={s.inputWidth.px()} bind:this={container}>
    <div class="stack">
        <AlgoStack
            {memory}
            bind:initAlgo={$input_store.initAlgo}
            bind:optimAlgoStack={$input_store.optimAlgoStack}
        />
    </div>
    <div class="slider">
        <Slider
            text="Number of Points"
            bind:value={$input_store.nPoints}
            min={s.minPoints}
            max={s.maxPoints}
        />
    </div>
</div>

<style>
    .container {
        box-sizing: border-box;
        padding: 20px;
        padding-right: 30px;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .container::-webkit-scrollbar {
        width: 10px;
    }

    .container::-webkit-scrollbar-track {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .container::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .container::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .stack {
        flex: 1;
        width: 100%;
    }
    .slider {
        width: 100%;
    }
</style>
