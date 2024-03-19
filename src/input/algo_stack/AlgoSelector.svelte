<!-- Dropdown.svelte -->

<script lang="ts">
    import type { Actions } from "../../App.svelte";
    import { fontColor } from "../../settings";
    import { buttonColor, buttonMargin, buttonHeight } from "../../settings";

    export let selectedOption: string;
    export let algoOptions: string[];
    export let algoDescription: (arg0: any) => string;
</script>

<select
    style:background-color={buttonColor}
    style:margin={buttonMargin.px()}
    style:height={buttonHeight.px()}
    style:color={fontColor}
    id="options"
    bind:value={selectedOption}
>
    {#each algoOptions as option}
        <option value={option} title={algoDescription(option)}>{option}</option>
    {/each}
</select>

<style>
    select {
        border-radius: 10%;
        border: none;
        outline: none;
        width: 100%;
    }
</style>
