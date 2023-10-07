import { writable } from "svelte/store";
import { algoLabels } from "../algos/algo_utils";

export const input_store = writable({
    nPoints: 3,
    starterAlgo: algoLabels.random,
    optimizerAlgo: algoLabels.twoOpt,
});
