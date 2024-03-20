<!-- Dropdown.svelte -->

<script lang="ts">
    import { fontColor } from "../../settings";
    import { buttonColor, buttonMargin, buttonHeight } from "../../settings";

    type algoLabel = $$Generic;
    export let algoOptions: algoLabel[];
    export let selectedOption: algoLabel;
    export let algoDescription: (arg0: algoLabel) => string;
    export let onChange: (arg0: algoLabel) => void;

    function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        onChange(target.value as algoLabel);
    }
</script>

<select
    style:background-color={buttonColor}
    style:margin={buttonMargin.px()}
    style:height={buttonHeight.px()}
    style:color={fontColor}
    id="options"
    value={selectedOption}
    on:change={handleChange}
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
