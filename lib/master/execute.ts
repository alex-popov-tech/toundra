import * as yargs from 'yargs';
import { Runner } from './runner';


const argv = yargs
    .usage('Usage: $0 <command> [options] <path_to_spec_files>')
    .command('crunner', 'Run tests')
    .example('$0 crunner --threads 20 spec.js', 'run tests concurrently in 20 threads')
    .alias('t', 'threads').describe('t', 'Threads count').default('t', 1)
    .help('h').alias('h', 'help')
    .epilog('copyright 2019')
    .argv;

const startTime = new Date().getTime();
console.log('==================================')
console.log(`RUNNER STARTED`);
console.log('==================================')
Runner.initialize({threads: argv.threads, specs: argv._}).run().then(_ => {
    console.log('==================================')
    console.log(`RUNNER FINISHED, time taken - ${new Date().getTime() - startTime}ms`);
    console.log('==================================')
});
