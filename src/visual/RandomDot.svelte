<script lang="ts">
    import { Layer, type Render } from "svelte-canvas";

    let x = 0.5 + 0.6 * (Math.random() - 0.5);
    let y = 0.5 + 0.6 * (Math.random() - 0.5);
    const render: Render = ({ context, width, height }) => {
        context.fillStyle = "white";
        context.beginPath();
        context.arc(x * width, y * height, 7, 0, 2 * Math.PI);
        context.fill();
    };
</script>

<Layer {render} />
