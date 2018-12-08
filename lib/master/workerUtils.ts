const {Worker} = require('worker_threads');

export namespace WorkerUtils {

    export function startWorker(jsFilePath: string, workerData: any, callback: (error: Error, result: any) => any) {
        const worker = new Worker(jsFilePath, {workerData: workerData});
        let wresult;
        let werror;
        worker.on('message', message => {
            wresult = message;
        });
        worker.on('error', error => {
            werror = error;
        });
        worker.on('exit', _ => callback(werror, wresult));
    }

    export async function asyncStartWorker(jsFilePath: string, workerData: any): Promise<any> {
        return new Promise<any>(((resolve, reject) => {
            startWorker(jsFilePath, workerData, (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        }));
    }
}
