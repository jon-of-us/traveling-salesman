import { writable } from "svelte/store";
import { algoLabels } from "../algos/algos";

export const input_store = writable({
    nPoints: 3,
    starterAlgo: algoLabels.random,
});
