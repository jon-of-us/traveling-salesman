<!-- Dropdown.svelte -->

<script lang="ts">
    import {
        fontColor,
        buttonMargin,
        stackHeight,
        buttonColor,
    } from "../../settings";
    export let text = "";
</script>

<button
    on:click
    style:background-color={buttonColor}
    style:margin={buttonMargin.px()}
    style:height={stackHeight.px()}
    style:color={fontColor}
>
    {text}
</button>

<style>
    button {
        text-align: left;
        border-radius: 10%;
        border: none;
        outline: none;
        width: 100%;
    }
</style>
