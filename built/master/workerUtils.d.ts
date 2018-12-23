export declare namespace WorkerUtils {
    function asyncStartWorker(jsFilePath: string, workerData: any): Promise<any>;
    function startWorker(jsFilePath: string, workerData: any, callback: (error: Error, result: any) => any): void;
}
