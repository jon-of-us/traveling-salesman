<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
</script>

<div class="container">
    <Slider text="Slider 1" bind:value={$input_store.slider1} />
    <Slider text="Slider 2" bind:value={$input_store.slider2} />
</div>

<style>
    .container {
        position: absolute;
        right: 30px;
        top: 20px;
    }
</style>
