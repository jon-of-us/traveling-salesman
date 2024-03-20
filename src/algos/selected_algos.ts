import type { initAlgoLabel, optimAlgoLabel } from "./algo_utils";
import { initAlgoLabels, optimAlgoLabels } from "./algo_utils";

export class SelectedAlgos {
    initAlgo = initAlgoLabels[0] as initAlgoLabel;
    optimAlgoStack = [
        optimAlgoLabels[0],
        optimAlgoLabels[1],
    ] as optimAlgoLabel[];
    all() {
        return [this.initAlgo, ...this.optimAlgoStack];
    }
}
