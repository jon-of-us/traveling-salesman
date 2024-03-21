<script lang="ts">
    import * as s from "../settings";
    let showText = false;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    id="container"
    on:mouseover={() => (showText = true)}
    on:mouseout={() => (showText = false)}
>
    <div id="info-button">
        <div id="placeholder"></div>
        <button
            class="square-button"
            style:background-color={s.buttonColor}
            style:color={s.fontColor}
        >
            info
        </button>
    </div>
    {#if showText}
        <span class="hover-text" style:color={s.fontColor}>
            Watch various algorithms solve the traveling salesman problem. A
            salesman traveling from city to city wants to minimize the total
            distance traveled before returning to his starting point. Scroll on
            the bar in the right to see the steps the algorithm took. Select
            different algorithms to see how they compare. Click on the canvas to
            add cities. Drag cities to move them.
        </span>
    {/if}
</div>

<style>
    #info-button {
        position: relative;
        display: flex;
        flex-direction: column;
    }
    #placeholder {
        flex-grow: 1;
    }
    #container {
        position: relative;
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 25px;
        left: 25px;
        width: 500px;
    }
    .square-button {
        width: 50px;
        height: 28px;
        border-radius: 5px;
        cursor: pointer;
        border: 0px;
        font-size: 21px;
        font-family: serif;
        margin-right: 8px;
    }

    .hover-text {
        background-color: #171717;
        padding: 8px;
        border-radius: 4px;
        font-size: 17px;
        z-index: 10;
        text-align: justify;
        font-family: Cambria;
    }
</style>
