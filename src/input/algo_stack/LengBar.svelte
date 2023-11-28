<script lang="ts">
    import type { step } from "../../data/memory";
    import * as s from "../../settings";
    import { input_store } from "../input_store";

    export let step: step;
    export let maxLeng: number;
    $: color =
        step.index == $input_store.renderedStep
            ? s.activeBarColor
            : s.inactiveBarColor;
    $: width = `${(step.len / maxLeng) * 100}%`;
    let button: HTMLButtonElement | undefined;

    $: {
        if (step.index == $input_store.renderedStep) {
            button?.scrollIntoView({ behavior: "instant", block: "center" });
            // scroll faster
        }
    }

    function handleClick() {
        $input_store.renderedStep = step.index;
    }
</script>

<div
    id="container"
    title="length at this step"
    style:margin={s.buttonMargin.px()}
>
    <div id="placehodler"></div>
    <sub style:color>
        {(step.len + 0.0001).toString().slice(0, 4)}
    </sub>

    <button
        style:background-color={color}
        style:width
        on:click={handleClick}
        bind:this={button}
    />
</div>

<style>
    sub {
        margin: -4px;
        margin-right: 5px;
    }
    #container {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    #placehodler {
        flex: 1;
    }
    button {
        align-self: center;
        border-radius: 5px;
        border: 0px;
        height: 10px;
    }
</style>
