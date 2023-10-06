import { writable } from "svelte/store";
import { type algoOptions } from "../algos/algotypes";

export const input_store = writable({
    nPoints: 3,
    starterAlgo: "random" as algoOptions,
});
