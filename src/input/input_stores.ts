import { writable } from "svelte/store";
import type { initAlgoLabel, optimAlgoLabel } from "../algos/algo_utils";
import { initAlgoLabels, optimAlgoLabels } from "../algos/algo_utils";
import * as s from "../settings";

export const memoryStore = writable({
    initAlgo: initAlgoLabels[1] as initAlgoLabel,
    optimAlgoStack: [
        optimAlgoLabels[0],
        optimAlgoLabels[1],
    ] as optimAlgoLabel[],
});

export const visualStore = writable({
    renderedStep: 15,
});
