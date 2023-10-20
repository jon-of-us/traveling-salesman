<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
    import * as is from "./input_settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";

    export let run: () => void;
</script>

<div class="container">
    <div class="stack">
        <AlgoStack
            bind:initAlgoAndLeng={$input_store.initAlgoAndLeng}
            bind:optimAlgoAndLengStack={$input_store.optimAlgoAndLengStack}
            {run}
        />
    </div>
    <div class="slider">
        <Slider
            text="Number of Points"
            bind:value={$input_store.nPoints}
            min={is.minPoints}
            max={is.maxPoints}
        />
    </div>
</div>

<style>
    .container {
        box-sizing: border-box;
        width: 240px;
        padding: 20px;
        padding-right: 30px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .stack {
        flex: 1;
        width: 100%;
    }
    .slider {
        width: 100%;
    }
</style>
