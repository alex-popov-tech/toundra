"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const configuration_1 = require("../configuration");
const collector_1 = require("./collector/collector");
const run_1 = require("./run");
const argv = yargs
    .usage('Usage: $0 <command> [options] <path_to_spec_files>')
    .command('toundra', 'Run tests')
    .example('$0 toundra --threads 20 spec.js', 'run tests concurrently in 20 threads')
    .alias('t', 'threads').describe('t', 'Threads count').default('t', 1)
    .help('h').alias('h', 'help')
    .epilog('copyright 2019')
    .argv;
const collector = collector_1.Collector.initialize(argv._);
collector.addListener(configuration_1.Configuration.DEFAULT_LISTENER);
const data = collector.getData();
const testsRun = new run_1.Run(data, argv.threads);
testsRun.run().then(_ => {
});
//# sourceMappingURL=execute.js.map