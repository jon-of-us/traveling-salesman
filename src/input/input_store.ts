import { writable } from "svelte/store";
import type { initAlgoAndLeng, optimAlgoAndLeng } from "../algos/algo_utils";
import { initAlgoLabels, optimAlgoLabels } from "../algos/algo_utils";

export const input_store = writable({
    nPoints: 20,
    initAlgoAndLeng: [initAlgoLabels[0], "?"] as initAlgoAndLeng,
    optimAlgoAndLengStack: [[optimAlgoLabels[0], "?"]] as optimAlgoAndLeng[],
});
