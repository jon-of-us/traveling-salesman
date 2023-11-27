<script lang="ts">
    import { Layer, type Render } from "svelte-canvas";
    import * as s from "../settings";
    import { type pointCoords } from "../data/nodes";

    export let coords: [pointCoords, pointCoords];
    $: [[x1, y1], [x2, y2]] = coords;
    export let opacity = 1;

    const render: Render = ({ context, width, height }) => {
        context.beginPath();
        context.moveTo(x1 * width, y1 * height);
        context.lineTo(x2 * width, y2 * height);
        context.strokeStyle = s.fontColorTransparent(opacity);
        context.lineWidth = s.lineWidth;
        context.stroke();
    };
</script>

<Layer {render} />
