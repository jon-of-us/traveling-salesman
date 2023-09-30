<script lang="ts">
    import Slider from "./Slider.svelte";
    import { input_store } from "./input_store";
</script>

<div class="container">
    <Slider text="Number of Points" bind:value={$input_store.nPoints} />
</div>

<style>
    .container {
        position: absolute;
        right: 30px;
        top: 20px;
    }
</style>
