<script>
    import {
        buttonMargin,
        stackHeight,
        backgroundColor,
    } from "./stack_settings";
    export let text = "";
</script>

<button
    on:click
    style:background-color={backgroundColor}
    style:margin={buttonMargin.px()}
    style:height={stackHeight.px()}
    style:width={stackHeight.px()}
>
    <h1 style:font-size={stackHeight.multiply(0.9).px()}>{text}</h1>
</button>

<style>
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
    }
    h1 {
        transform: translate(0%, -12%);
    }
</style>
