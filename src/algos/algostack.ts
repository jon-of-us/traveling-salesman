import type { initAlgoLabel, optimAlgoLabel } from "../algos/algo_utils";
import { initAlgoLabels, optimAlgoLabels } from "../algos/algo_utils";

export class AlgoStack {
    initAlgo = initAlgoLabels[1] as initAlgoLabel;
    optimAlgoStack = [
        optimAlgoLabels[0],
        optimAlgoLabels[1],
    ] as optimAlgoLabel[];
    all() {
        return [this.initAlgo, ...this.optimAlgoStack];
    }
}
