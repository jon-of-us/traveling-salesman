<script lang="ts">
    import * as s from "../../settings";

    export let length: number;
    export let maxLeng: number;

    $: width = `${(length / maxLeng) * 100}%`;
    $: console.log(maxLeng);
</script>

<div
    id="container"
    title="length after this algorithm ran"
    style:margin={s.buttonMargin.px()}
>
    <div id="placehodler"></div>
    <sub style:color={s.green}>
        {((length + 0.0001).toString() + "    ").slice(0, 4)}
    </sub>

    <button style:background-color={s.green} style:width />
</div>

<style>
    sub {
        margin: -4px;
        margin-right: 5px;
    }
    #container {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    #placehodler {
        flex: 1;
    }
    button {
        align-self: center;
        border-radius: 5px;
        border: 0px;
        height: 10px;
    }
</style>
