<script lang="ts">
    import Input from "./input/Input.svelte";
    import Canvas from "./canvas/Canvas.svelte";
    import Nodes from "./visual/Nodes.svelte";
    import Edges from "./visual/Edges.svelte";
    import Infobutton from "./visual/Infobutton.svelte";

    import { CanvasMouseHandler } from "./canvas/canvas_mouse_handler";
    import { Main } from "./main";

    import * as s from "./settings";
    import { onMount } from "svelte";

    let width: number;
    let height: number;
    /** assign to rerender */
    let renderCanvasKey = 0;
    /** assign to rerender */
    let renderInputKey = 0;
    const main = new Main(
        () => renderCanvasKey++,
        () => renderInputKey++
    );

    const canvasMouseHandler = new CanvasMouseHandler(main);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="app">
    <div
        id="canvas"
        bind:clientHeight={height}
        bind:clientWidth={width}
        on:mousedown={(e) =>
            canvasMouseHandler.handleMousedown(e, width, height)}
        on:mouseup={() => {
            canvasMouseHandler.handleMouseup();
        }}
        on:mouseleave={() => canvasMouseHandler.handleMouseLeave()}
    >
        <Canvas bind:width bind:height>
            {#key renderCanvasKey}
                <Nodes {main} />
                <Edges {main} />
            {/key}
        </Canvas>
    </div>
    <div id="input">
        {#key renderInputKey}
            <Input {main} />
        {/key}
    </div>
    <Infobutton />
</div>

<style>
    #app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }
    #canvas {
        border-style: border-box;
        margin: 15px;
        flex: 1;
        overflow: hidden;
    }
</style>
