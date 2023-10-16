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
</script>

<!-- HTML structure for the dropdown -->
<div>
    <select
        style:background-color={backgroundColor}
        style:margin={buttonMargin.px()}
        style:height={stackHeight.px()}
        style:width={stackHeight.multiply(3.5).px()}
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
</div>

<style lang>
    select {
        border-radius: 10%;
        border: none;
        outline: none;
    }
    div {
        border: none;
        outline: none;
    }
</style>
