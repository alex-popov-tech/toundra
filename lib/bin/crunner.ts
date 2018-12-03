#!/usr/bin/env node
import * as path from 'path';
import { Runner } from '../runner';
import * as yargs from 'yargs';


const argv = yargs
    .usage('Usage: $0 <command> [options] <path_to_spec_files>')
    .command('crunner', 'Run tests')
    .example('$0 crunner --threads 20 spec.js', 'run tests concurrently in 20 threads')
    .alias('t', 'threads').describe('t', 'Threads count').default('t', 1)
    .help('h').alias('h', 'help')
    .epilog('copyright 2019')
    .argv;
const specsPaths = [argv._[0]]; // complex parser for wildcards

Runner.init({threads: argv.threads});

const absolutePaths = specsPaths.map(relative => path.resolve(relative));

for (const specPath of absolutePaths) {
    require(specPath);
}

const runner = Runner.getInstance();
const startTime = new Date().getTime();
runner.start().then(result => {
    console.log('RUNNER WORK FINISHED');
    console.log(JSON.stringify(result.map(testResult => `${testResult.description} error - ${testResult.error && testResult.error.message}`), null, 3));
    console.log('time taken', new Date().getTime() - startTime, 'ms');
});
