import { AfterRunTestInfo } from '../afterRunTestInfo';

export type OnTestFinishInfo = AfterRunTestInfo & { suiteName: string }
