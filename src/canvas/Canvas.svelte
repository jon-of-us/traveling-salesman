<script lang="ts">
    import { Canvas } from "svelte-canvas";
    import type { Actions } from "../App.svelte";

    export let width = 0;
    export let height = 0;
    export let actions: Actions;

    function handleClick(event: MouseEvent) {
        const x = event.offsetX;
        const y = event.offsetY;
        actions.addNode(x / width, y / height);
    }
</script>

<div>
    <Canvas {width} {height} on:mousedown={handleClick}>
        <slot />
    </Canvas>
</div>

<style>
    div {
        z-index: -1;
    }
</style>
