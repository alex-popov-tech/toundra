export class AsyncTaskQueue<T> {
    private readonly tasks: T[];
    private readonly taskProcessor: (task: T) => any;
    private readonly results: any[];
    private readonly asyncLimit: number;

    constructor(tasks: T[], taskProcessor: (task: T) => any, asyncLimit: number) {
        this.tasks = tasks;
        this.taskProcessor = taskProcessor;
        this.results = [];
        this.asyncLimit = asyncLimit;
    }

    async runAll(): Promise<any[]> {
        return new Promise<any[]>(resolve => {
            const tasksCount = this.tasks.length;
            const queueLimit = (this.asyncLimit && this.asyncLimit < tasksCount) ? this.asyncLimit : tasksCount;

            console.log('async runner, starting', queueLimit, 'tasks')
            // start initial number of tasks
            for (let i = 0; i < queueLimit; i++) {
                this.startTask(i, resolve);
            }
        });
    }

    private async startTask(index: number, resolveCallback) {
        const task = this.tasks[index];
        this.taskProcessor(task).then(
            this.resultHandlerCallback(index, resolveCallback),
            this.resultHandlerCallback(index, resolveCallback)
        );
    }

    private resultHandlerCallback(index: number, resolveCallback) {
        return (result: void) => {
            this.handleResult(result, index, resolveCallback);
        };
    }

    private handleResult(result: Error | void, index: number, resolveCallback) {
        this.saveTestResult(result);

        // if last - return all results
        if (this.results.length === this.tasks.length) {
            resolveCallback(this.results);
        }

        // start new task after current if needed
        if (index + this.asyncLimit < this.tasks.length) {
            this.startTask(index + this.asyncLimit, resolveCallback);
        }
    }

    private saveTestResult(result: Error | void) {
        this.results.push(result);
    }

}
