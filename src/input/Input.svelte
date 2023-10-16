<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
    import * as is from "./input_settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";
</script>

<div>
    <div class="algoStack">
        <AlgoStack
            bind:initAlgo={$input_store.initAlgo}
            bind:optimAlgoStack={$input_store.optimAlgoStack}
        />
    </div>
    <div class="sliderContainer">
        <Slider
            text="Number of Points"
            bind:value={$input_store.nPoints}
            min={is.minPoints}
            max={is.maxPoints}
        />
    </div>
</div>

<style>
    .algoStack {
        position: absolute;
        top: 20px;
        left: 30px;
    }
    .sliderContainer {
        position: absolute;
        right: 30px;
        top: 20px;
    }
</style>
