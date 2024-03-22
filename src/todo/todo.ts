import { debug } from "../settings";

class Task {
    constructor(
        public name: string,
        public priority: number,
        public complete: () => void,
        public isUnique: boolean
    ) {}
}

export class Todo {
    private queue: Task[] = [];
    add(name: string, complete: () => void, priority: number, isUnique = true) {
        const task = new Task(name, priority, complete, isUnique);
        if (task.isUnique && this.queue.map((x) => x.name).includes(task.name))
            return;
        this.queue.push(task);
        this.doAllAsync();
    }
    doNext() {
        if (this.queue.length == 0) return;
        const priorities = this.queue.map((x) => x.priority);
        const maxPriority = Math.max(...priorities);
        const maxIndex = priorities.indexOf(maxPriority);
        const task = this.queue[maxIndex];
        this.queue.splice(maxIndex, 1);
        if (debug)
            console.log(
                `Doing task: ${task.name} [time = ${performance.now()}]`
            );
        task.complete();
        // requestAnimationFrame(() => this.doNext());
    }
    doAll() {
        while (this.queue.length > 0) this.doNext();
    }
    private doAllAsync() {
        if (this.queue.length == 0) return;
        requestAnimationFrame(() => {
            this.doNext();
            this.doAllAsync();
        });
    }
}
