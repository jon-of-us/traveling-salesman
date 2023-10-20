<script lang="ts">
    import { fontColor } from "../../global_settings";
    import {
        buttonMargin,
        stackHeight,
        backgroundColor,
    } from "./stack_settings";

    export let run: () => void;
</script>

<button
    on:click={run}
    style:background-color={backgroundColor}
    style:margin={buttonMargin.px()}
    style:height={stackHeight.px()}
>
    <h1
        style:color={fontColor}
        style:font-size={stackHeight.multiply(0.55).px()}
    >
        Run!
    </h1>
</button>

<style>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        border-radius: 10%;
    }
</style>
