<script lang="ts">
    import Input from "./input/Input.svelte";
    import { input_store } from "./input/input_store";
    import Canvas from "./canvas/Canvas.svelte";
    import Node from "./visual/Node.svelte";
    import Edge from "./visual/Edge.svelte";
    import { Layer } from "svelte-canvas";
    import { Memory } from "./data/memory";

    let width: number;
    let height: number;

    let memory = new Memory();
    let runs = 0;
    $: {
        data.adjustNumberOfNodes($input_store.nPoints);
        let algos = [
            $input_store.initAlgo[0],
            ...$input_store.optimAlgoStack.map((o) => o[0]),
        ];
        // runAll(data, $input_store.initAlgoAndLeng[0]);
        // $input_store.initAlgoAndLeng[1] = data.totalLength();
        // for (let algoAndLeng of $input_store.optimAlgoAndLengStack) {
        //     runAll(data, algoAndLeng[0]);
        //     algoAndLeng[1] = data.totalLength();
        // }
        data = data;
        runs += 1;
    }
    function* iterAlgos() {
        let;
        for (let algo of algos) {
            yield* runSteps(data, algo);
        }
    }
    function run() {
        let algoIterator = iterAlgos();
        let interval = setInterval(() => {
            if (algoIterator.next().done) {
                clearInterval(interval);
            }
            console.log("a");
            data = data;
            runs += 1;
        }, 200);
    }
</script>

<div id="app">
    <div id="canvas" bind:clientHeight={height} bind:clientWidth={width}>
        <Canvas bind:width bind:height>
            {#each data.nodes.all() as point}
                <Node coords={data.nodes.get(point)} />
            {/each}
            {#each data.edges.all() as edge}
                <Edge
                    coords={[data.nodes.get(edge[0]), data.nodes.get(edge[1])]}
                />
            {/each}
            <Layer
                render={({ context }) => {
                    runs;
                }}
            />
        </Canvas>
    </div>
    <div id="input">
        <Input {run} />
    </div>
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
    }
</style>
