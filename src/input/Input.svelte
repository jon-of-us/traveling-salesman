<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
    import * as s from "../settings";
    import AlgoStack from "./algo_stack/AlgoStack.svelte";
</script>

<div class="container">
    <div class="stack" />
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
        width: 240px;
        padding: 20px;
        padding-right: 30px;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
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
