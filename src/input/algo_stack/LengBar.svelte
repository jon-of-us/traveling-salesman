<script lang="ts">
    import * as s from "../../settings";

    export let length: number;
    export let maxLeng: number;

    $: width = `${(length / maxLeng) * 100}%`;
</script>

<div id="container" style:width title="length after this algorithm ran">
    <sub style:color={s.green}>
        {(length.toString() + "    ").slice(0, 4)}
    </sub>

    <button style:background-color={s.green} />
</div>

<style>
    #container {
        display: flex;
        top: -10px;
        flex-direction: row;
        float: right;
    }

    button {
        flex: 1;
        border-radius: 5px;
        border: 0px;
        margin: 5px;
    }
</style>
