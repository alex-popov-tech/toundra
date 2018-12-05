// export class AsyncTaskQueue {
//     private readonly tests: Test[];
//     private readonly asyncLimit: number;
//     private readonly results: TestResult[];
//
//     constructor(tests: Test[], asyncLimit: number) {
//         this.tests = tests;
//         this.results = [];
//         this.asyncLimit = asyncLimit;
//     }
//
//     async run(): Promise<TestResult[]> {
//         return new Promise<TestResult[]>(resolve => {
//             const testsCount = this.tests.length;
//             const maxThreads = (this.asyncLimit && this.asyncLimit < testsCount) ? this.asyncLimit : testsCount;
//
//             // start initial number of tasks
//             for (let i = 0; i < maxThreads; i++) {
//                 this.startTest(i, resolve);
//             }
//
//         });
//     }
//
//     private async startTest(testIndex: number, resolveCallback) {
//         const test = this.tests[testIndex];
//         test.body().then(
//             result => this.handleTestResult(test.description, result, testIndex, resolveCallback),
//             error => this.handleTestResult(test.description, error, testIndex, resolveCallback)
//         );
//     }
//
//     private handleTestResult(description: string, result: Error | void, index: number, resolveCallback) {
//         this.saveTestResult(description, result);
//
//         // if last - return all results
//         if (this.results.length === this.tests.length) {
//             resolveCallback(this.results);
//         }
//
//         // start new task after current if needed
//         if (index + this.asyncLimit < this.tests.length) {
//             this.startTest(index + this.asyncLimit, resolveCallback);
//         }
//     }
//
//     private saveTestResult(description: string, testResult: Error | void) {
//         const isError = testResult instanceof Error;
//         this.results.push({description: description, isSuccess: !isError, error: isError ? testResult as Error : null});
//     }
//
// }
