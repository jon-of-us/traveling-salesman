<script lang="ts">
    import * as ts from "../settings/template_settings";

    export let min = 0;
    export let max = 100;
    export let step = 1;
    export let initalValue = Infinity;
    export let value: number;
    if (initalValue != Infinity) {
        value = initalValue;
    }
    let color = ts.fontColor;
    /**
     * either string or function that returns string and takes the slider value as input
     * the text `${text}: ${value}` is displayed if string is given
     * */
    export let text: string | ((a: number) => string) = (value: number) =>
        `${value}`;
</script>

<div class="slidercontainer">
    <input type="range" {min} {max} {step} bind:value />
    <span style="--color: {color};"
        >{typeof text == "string" ? `${text}: ${value}` : text(value)}</span
    >
</div>

<style>
    .slidercontainer {
        width: 200px;
        height: 50px;
    }

    input {
        width: 100%;
        height: 14px;
        cursor: pointer;
        background-color: transparent;
        appearance: none;
    }

    input::-webkit-slider-thumb {
        appearance: none;
        width: 14px;
        height: 14px;
        background-color: white;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
    }

    input::-moz-range-thumb {
        appearance: none;
        width: 14px;
        height: 14px;
        background-color: white;
        border-radius: 50%;
        cursor: pointer;
    }

    input::-webkit-slider-runnable-track {
        opacity: 0.4;
        height: 14px;
        background-color: grey;
        border-radius: 0.25rem;
    }

    input::-moz-range-track {
        opacity: 0.4;
        height: 14px;
        background-color: grey;
        border-radius: 0.25rem;
    }

    span {
        color: var(--color);
        position: relative;
        left: 0.5rem;
    }
</style>
