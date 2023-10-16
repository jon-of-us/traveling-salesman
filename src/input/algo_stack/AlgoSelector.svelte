<!-- Dropdown.svelte -->

<script lang="ts">
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
        style:backgroundColor
        style:margin={buttonMargin.px()}
        style:height={stackHeight.px()}
        style:width={stackHeight.multiply(2).px()}
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

<style>
    div {
        border: none;
        outline: none;
    }
</style>
