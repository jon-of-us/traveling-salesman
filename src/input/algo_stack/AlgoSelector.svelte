<!-- Dropdown.svelte -->

<script lang="ts">
    import { fontColor } from "../../global_settings";
    import {
        backgroundColor,
        buttonMargin,
        stackHeight,
    } from "./stack_settings";

    export let selectedOption: string;
    export let algoOptions: string[];
    export let algoDescription: (arg0: any) => string;
    export let length: number | string;
</script>

<!-- HTML structure for the dropdown -->
<div>
    <select
        style:background-color={backgroundColor}
        style:margin={buttonMargin.px()}
        style:height={stackHeight.px()}
        style:color={fontColor}
        id="options"
        bind:value={selectedOption}
    >
        {#each algoOptions as option}
            <option value={option} title={algoDescription(option)}
                >{option}</option
            >
        {/each}
    </select>
    <sub>
        length after execution: {typeof length == "number"
            ? Math.round(length * 100) / 100
            : length}
    </sub>
</div>

<style lang>
    select {
        border-radius: 10%;
        border: none;
        outline: none;
        width: 100%;
    }
    div {
        border: none;
        outline: none;
    }
    sub {
        position: relative;
        color: #00df16;
        top: -10px;
    }
</style>
