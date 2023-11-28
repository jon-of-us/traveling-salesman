<script lang="ts">
    import Slider from "./Slider.svelte";
    import { visualStore, memoryStore } from "./input_stores";
    import * as s from "../settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";
    import type { Memory } from "../data/memory";
    import { onMount } from "svelte";

    export let memory: Memory;

    let virtualScroll = 0;
    let container: HTMLDivElement;
    $: {
        virtualScroll = Math.max(virtualScroll, 0);
        virtualScroll = Math.min(
            virtualScroll,
            (memory.n_steps - 1) / s.scrollSpeed
        );
    }
    $: $visualStore.renderedStep = Math.round(virtualScroll * s.scrollSpeed);

    function adjustVirtualScroll(e: WheelEvent) {
        virtualScroll += e.deltaY;
    }
    onMount(() => {
        container.addEventListener("wheel", adjustVirtualScroll);
    });
</script>

<div class="container" style:width={s.inputWidth.px()} bind:this={container}>
    <div class="stack">
        <AlgoStack
            {memory}
            bind:initAlgo={$memoryStore.initAlgo}
            bind:optimAlgoStack={$memoryStore.optimAlgoStack}
        />
    </div>
    <div class="slider">
        <Slider
            text="Number of Points"
            bind:value={$memoryStore.nPoints}
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
