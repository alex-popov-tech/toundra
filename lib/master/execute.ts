import * as yargs from 'yargs';
import { Collector } from './collector/collector';
import { Run } from './run';


const argv = yargs
    .usage('Usage: $0 <command> [options] <path_to_spec_files>')
    .command('samael', 'Run tests')
    .example('$0 samael --threads 20 spec.js', 'run tests concurrently in 20 threads')
    .alias('t', 'threads').describe('t', 'Threads count').default('t', 1)
    .help('h').alias('h', 'help')
    .epilog('copyright 2019')
    .argv;


const collector = Collector.initialize(argv._);
const data = collector.getData()
const testsRun = new Run(data, argv.threads);

const startTime = new Date().getTime();
console.log('==================================');
console.log(`RUNNER STARTED`);
console.log('==================================');
testsRun.run().then(_ => {
    console.log('==================================');
    console.log(`RUNNER FINISHED, time taken - ${new Date().getTime() - startTime}ms`);
    console.log('==================================');
});
