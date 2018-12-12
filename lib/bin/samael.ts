#!/usr/bin/env node
// @ts-ignore
import { isMainThread } from 'worker_threads';
import { Configuration } from '../configuration';

require(isMainThread ? Configuration.MASTER_EXECUTOR_PATH : Configuration.WORKER_EXECUTOR_PATH);
