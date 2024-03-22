<script lang="ts">
    import type { step } from "../../data/memory";
    import type { Main } from "../../main";
    import * as s from "../../settings";
    export let step: step;
    export let maxLeng: number;
    export let main: Main;
    $: color =
        step.index == main.renderedStep ? s.activeBarColor : s.inactiveBarColor;
    $: width = `${(step.len / maxLeng) * 100}%`;
    let button: HTMLButtonElement | undefined;

    $: {
        if (step.index == main.renderedStep) {
            button?.scrollIntoView({ behavior: "instant", block: "center" });
            // scroll faster
        }
    }
</script>

<div
    id="container"
    title="length at this step"
    style:margin={s.buttonMargin.px()}
>
    <div id="placeholder"></div>
    <sub style:color>
        {(step.len + 0.0001).toString().slice(0, 4)}
    </sub>

    <button style:background-color={color} style:width bind:this={button} />
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
    #placeholder {
        flex: 1;
    }
    button {
        align-self: center;
        border-radius: 5px;
        border: 0px;
        height: 10px;
    }
</style>
