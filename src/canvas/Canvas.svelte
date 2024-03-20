<script lang="ts">
    import { Canvas } from "svelte-canvas";
    import type { Actions } from "../App.svelte";

    export let width = 0;
    export let height = 0;
</script>

<div>
    <Canvas {width} {height}>
        <slot />
    </Canvas>
</div>

<style>
    div {
        z-index: -1;
    }
</style>
