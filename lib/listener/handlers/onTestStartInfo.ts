import { BeforeRunTestInfo } from '../beforeRunTestInfo';

export type OnTestStartInfo = BeforeRunTestInfo & {suiteName: string};
