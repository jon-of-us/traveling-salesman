<script lang="ts">
    import Slider from "./Slider.svelte";
    import * as s from "../settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";
    import { onMount } from "svelte";
    import { Main } from "../main";

    export let main: Main;
    export let renderedStep: number;

    /**between 0 (included) and 1 (not included)*/
    let container: HTMLDivElement;

    function handleScroll(e: WheelEvent) {
        if (Math.abs(e.deltaY) < 0.2) return;
        let newVirtualScroll =
            main.virtualScroll +
            (e.deltaY / main.memory.nSteps) * s.scrollSpeed;
        newVirtualScroll = Math.max(newVirtualScroll, 0);
        newVirtualScroll = Math.min(newVirtualScroll, 0.9999);
        main.setVirtualScroll(newVirtualScroll);
    }
    onMount(() => {
        container.addEventListener("wheel", handleScroll);
    });
</script>

<div class="container" style:width={s.inputWidth.px()} bind:this={container}>
    <div class="stack">
        <AlgoStack {main} {renderedStep} />
    </div>
    <div class="slider">
        <Slider
            text="Number of Points"
            value={main.memory.nodes.count()}
            min={s.minPoints}
            max={s.maxNodes}
            onInput={(n) => main.adjustNumberOfNodes(n)}
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
