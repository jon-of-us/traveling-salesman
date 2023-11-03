import { Data } from "./data";
import { type algoLabel } from "../algos/algo_utils";
import { runSteps } from "../algos/algo_utils";

export type step = { data: Data; len: number } | algoLabel;

export class Memory {
    steps: step[] = [];
    maxLeng = 0;

    /** run all algos in order and save steps */
    runAlgos(algoLabels: algoLabel[]): void {
        // clear steps and maxLeng
        this.steps = [];
        this.maxLeng = 0;
        this.steps.push({ data: new Data(), len: 0 });
        /** is mutated with each step*/
        let changingData = new Data();
        for (let algoLabel of algoLabels) {
            this.steps.push(algoLabel);
            for (let _ of runSteps(changingData, algoLabel)) {
                let data: Data = structuredClone(changingData);
                let len = data.totalLength();
                this.maxLeng = Math.max(len, this.maxLeng);
                this.steps.push({ data, len });
            }
        }
    }
}
