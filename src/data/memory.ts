import { Data } from "./data";
import { type algoLabel } from "../algos/algo_utils";
import { runSteps } from "../algos/algo_utils";
import { Nodes } from "./nodes";
import { Edges } from "./edges";

export type step = { edges: Edges; len: number; index: number };

export class Memory {
    steps: step[][] = [];
    n_steps = 0;
    nodes = new Nodes();
    maxLeng = 0;

    private addRandomNodes(number = 1): void {
        for (let i = 0; i < number; i++) {
            this.nodes.add(Math.random(), Math.random());
        }
    }
    adjustNumberOfNodes(number: number): void {
        if (this.nodes.count() < number) {
            this.addRandomNodes(number - this.nodes.count());
        } else if (this.nodes.count() > number) {
            // delete last values
            let valuesToDelete = [...this.nodes.all()].slice(number);
            for (let value of valuesToDelete) {
                this.nodes.delete(value);
            }
        }
    }

    /** run all algos in order and save steps */
    runAlgos(algoLabels: algoLabel[]): void {
        // clear steps and maxLeng
        this.steps = [];
        this.maxLeng = 0;
        let index = 0;
        /** is mutated with each step*/
        let changingData = new Data(this.nodes);

        for (let algoLabel of algoLabels) {
            let stepArr: step[] = [];

            const pushStep = () => {
                let len = changingData.totalLength();
                this.maxLeng = Math.max(len, this.maxLeng);

                let edges = new Edges(changingData.edges);

                stepArr.push({ edges, len, index });
                index++;
                this.n_steps = index;
            };

            pushStep();
            for (let _ of runSteps(changingData, algoLabel)) {
                pushStep();
            }
            this.steps.push(stepArr);
        }
    }
}
