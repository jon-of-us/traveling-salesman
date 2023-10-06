<script lang="ts">
    import { Layer, type Render } from "svelte-canvas";
    import * as vs from "./visual_settings";
    import * as gs from "../global_settings";
    import { type pointCoords } from "../data/nodes";

    export let coords: [pointCoords, pointCoords];
    $: [[x1, y1], [x2, y2]] = coords;

    const render: Render = ({ context, width, height }) => {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.strokeStyle = gs.fontColor;
        context.lineWidth = vs.lineWidth;
        context.stroke();
    };
</script>

<Layer {render} />
