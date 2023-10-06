import { writable } from "svelte/store";
import { algoLabels } from "../algos/algotypes";

export const input_store = writable({
    nPoints: 3,
    starterAlgo: algoLabels.random,
});
