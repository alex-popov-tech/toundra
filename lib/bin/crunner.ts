#!/usr/bin/env node
// @ts-ignore
import { isMainThread } from 'worker_threads';
import * as path from 'path';

const executorPath = path.resolve(`./built/${isMainThread ? 'master' : 'slave'}/execute.js`);
require(executorPath);
