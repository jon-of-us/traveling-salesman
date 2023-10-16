<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
    import * as is from "./input_settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";
</script>

<div class="container">
    <div class="stackContainer">
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
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
    }
    .stackContainer {
        position: relative;
        top: 0px;
    }
    .sliderContainer {
        position: relative;
        bottom: 0px;
    }
</style>
