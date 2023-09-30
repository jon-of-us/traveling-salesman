<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import RandomDot from "./visual/RandomDot.svelte";
</script>

<div id="app">
    <Input />
    <Canvas>
        {#each { length: $input_store.slider1 } as _, i}
            <RandomDot />
        {/each}
        <RandomDot />
    </Canvas>
</div>
