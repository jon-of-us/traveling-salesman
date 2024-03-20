<script lang="ts">
    import Slider from "./Slider.svelte";
    import * as s from "../settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";
    import type { Memory } from "../data/memory";
    import { onMount } from "svelte";
    import type { Actions } from "../App.svelte";
    import { SelectedAlgos } from "../algos/selected_algos";

    export let memory: Memory;
    export let actions: Actions;
    export let selectedAlgos: SelectedAlgos;
    export let renderedStep: number;

    /**between 0 (included) and 1 (not included)*/
    let virtualScroll = 0.999;
    let container: HTMLDivElement;

    function handleScroll(e: WheelEvent) {
        if (Math.abs(e.deltaY) < 0.2) return;
        virtualScroll += (e.deltaY / memory.nSteps) * s.scrollSpeed;
        virtualScroll = Math.max(virtualScroll, 0);
        virtualScroll = Math.min(virtualScroll, 0.9999);
        actions.setVirtualScroll(virtualScroll);
    }
    onMount(() => {
        container.addEventListener("wheel", handleScroll);
    });
</script>

<div class="container" style:width={s.inputWidth.px()} bind:this={container}>
    <div class="stack">
        <AlgoStack {memory} {selectedAlgos} {actions} {renderedStep} />
    </div>
    <div class="slider">
        <Slider
            text="Number of Points"
            value={memory.nodes.count()}
            min={s.minPoints}
            max={s.maxNodes}
            onInput={(n) => actions.adjustNumberOfNodes(n)}
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
