<!-- Dropdown.svelte -->

<script lang="ts">
    import { fontColor } from "../../settings";
    import { buttonColor, buttonMargin, stackHeight } from "../../settings";

    export let selectedOption: string;
    export let algoOptions: string[];
    export let algoDescription: (arg0: any) => string;
</script>

<!-- HTML structure for the dropdown -->
<!-- <div> -->
<select
    style:background-color={buttonColor}
    style:margin={buttonMargin.px()}
    style:height={stackHeight.px()}
    style:color={fontColor}
    id="options"
    bind:value={selectedOption}
>
    {#each algoOptions as option}
        <option value={option} title={algoDescription(option)}>{option}</option>
    {/each}
</select>

<!-- </div> -->

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
</style>
