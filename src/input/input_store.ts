import { writable } from "svelte/store";
import type { initAlgoLabel, optimAlgoLabel } from "../algos/algo_utils";
import { initAlgoLabels, optimAlgoLabels } from "../algos/algo_utils";

export const input_store = writable({
    nPoints: 20,
    initAlgo: initAlgoLabels[0],
    optimAlgoStack: [optimAlgoLabels[0]],
});
