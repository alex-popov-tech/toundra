import * as yargs from 'yargs';
import { Runner } from './runner';


const argv = yargs
    .usage('Usage: $0 <command> [options] <path_to_spec_files>')
    .command('samael', 'Run tests')
    .example('$0 samael --threads 20 spec.js', 'run tests concurrently in 20 threads')
    .alias('t', 'threads').describe('t', 'Threads count').default('t', 1)
    .help('h').alias('h', 'help')
    .epilog('copyright 2019')
    .argv;


const startTime = new Date().getTime();
console.log('==================================')
console.log(`RUNNER STARTED`);
console.log('==================================')
Runner.initialize({threads: argv.threads, specs: argv._}).run().then(suiteResults => {
    // suiteResults.suites.forEach(suite => suite.tests.forEach(test => test.suiteResult = null));
    console.log('==================================')
    console.log(JSON.stringify(suiteResults, removeCircular, 3));
    console.log(`RUNNER FINISHED, time taken - ${new Date().getTime() - startTime}ms`);
    console.log('==================================')
});

const cache = [];
const removeCircular = function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Duplicate reference found
            try {
                // If this value does not reference a parent it can be deduped
                return JSON.parse(JSON.stringify(value));
            } catch (error) {
                // discard key if value cannot be deduped
                return;
            }
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
};

