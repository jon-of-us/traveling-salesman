<script lang="ts">
    export let length: number | "?";
    export let maxLeng: number | "?";
    $: width = `${
        typeof maxLeng == "number"
            ? typeof length == "number"
                ? (length / maxLeng) * 100
                : 0
            : 0
    }%`;
    import * as ss from "./stack_settings";
</script>

<div id="container" style:width title="length after this algorithm ran">
    <sub style:color={ss.green}>
        {typeof length == "number"
            ? (length.toString() + "    ").slice(0, 4)
            : length}
    </sub>

    <button style:background-color={ss.green} />
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
