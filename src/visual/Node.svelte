<script lang="ts">
    import { Layer, type Render } from "svelte-canvas";
    import * as s from "./Node.settings";
    import { type pointCoords } from "../data/nodes";

    export let coords: pointCoords;
    $: [x, y] = coords;

    const render: Render = ({ context, width, height }) => {
        context.fillStyle = "white";
        context.beginPath();
        context.arc(x * width, y * height, s.radius, 0, 2 * Math.PI);
        context.fill();
    };
</script>

<Layer {render} />
