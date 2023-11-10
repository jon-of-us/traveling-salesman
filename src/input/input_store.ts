import { writable } from "svelte/store";
import type { initAlgoLabel, optimAlgoLabel } from "../algos/algo_utils";
import { initAlgoLabels, optimAlgoLabels } from "../algos/algo_utils";

export const input_store = writable({
    nPoints: 20,
    renderedStep: 40,
    initAlgo: initAlgoLabels[0] as initAlgoLabel,
    optimAlgoStack: [optimAlgoLabels[0]] as optimAlgoLabel[],
});
