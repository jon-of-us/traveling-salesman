<script lang="ts">
    import { Canvas } from "svelte-canvas";
    import * as ts from "../settings/template_settings";

    export let width = 0;
    export let height = 0;
    let innerWidth: number;
    let innerHeight: number;
    $: width = innerWidth - 17;
    $: height = innerHeight - 17;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div>
    <Canvas {width} {height}>
        <slot />
    </Canvas>
</div>

<style>
    div {
        z-index: -1;
        position: absolute;
    }
</style>
