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
</script>

<div id="container" style:width title="length after this algorithm ran">
    <sub>
        {typeof length == "number" ? Math.round(length * 100) / 100 : length}
    </sub>

    <button />
</div>

<style>
    #container {
        display: flex;
        top: -10px;
        flex-direction: row;
        float: right;
    }
    sub {
        color: #00df16;
    }
    button {
        background-color: #00df16;
        flex: 1;
        border-radius: 5px;
        border: 0px;
        margin: 5px;
    }
</style>
