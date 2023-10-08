<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
    import * as is from "./input_settings";
</script>

<div class="container">
    <Slider
        text="Number of Points"
        bind:value={$input_store.nPoints}
        min={is.minPoints}
        max={is.maxPoints}
    />
</div>

<style>
    .container {
        position: absolute;
        right: 30px;
        top: 20px;
    }
</style>
