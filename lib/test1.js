const  {isMainThread, parentPort, Worker, workerData} = require('worker_threads');

if (isMainThread) {
    console.log('start main thread');
    const worker = new Worker('./lib/test1.js', {workerData: 'data from main thread'});
    worker.on('message', (mes) => console.log('main thread catched message from worker:', mes));
    worker.on('error', _ => console.log('main thread catched worker error event', _))
    worker.on('exit', _ => console.log('main thread catched worker exit event'))
    console.log('finish main thread')
} else {
    console.log('start child thread');
    parentPort.postMessage('message from child thread');
    throw new Error('oops');
    console.log('finish child thread')
}
