<script lang="ts">
    import { fontColor } from "../../settings";
    import { buttonMargin, stackHeight, buttonColor } from "../../settings";

    export let run: () => void;
</script>

<button
    on:click={run}
    style:background-color={buttonColor}
    style:margin={buttonMargin.px()}
    style:height={stackHeight.px()}
>
    <h1
        style:color={fontColor}
        style:font-size={stackHeight.multiply(0.55).px()}
    >
        Run!
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
</style>
