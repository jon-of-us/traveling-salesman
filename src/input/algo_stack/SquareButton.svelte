<script>
    import {
        fontColor,
        buttonMargin,
        buttonHeight,
        buttonColor,
        squareButtonSize,
    } from "../../settings";
    export let text = "";
</script>

<button
    on:click
    style:background-color={buttonColor}
    style:margin-left={buttonMargin.multiply(2).px()}
    style:height={squareButtonSize.px()}
    style:width={squareButtonSize.px()}
>
    <h1
        style:color={fontColor}
        style:font-size={squareButtonSize.multiply(0.9).px()}
    >
        {text}
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
    h1 {
        transform: translate(0%, -5%);
    }
</style>
