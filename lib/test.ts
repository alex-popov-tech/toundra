export type Test = {
    description: string, body: () => Promise<void | any>
};
