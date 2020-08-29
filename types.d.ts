declare module "resolve-css" {
    export type load = (file: string) => Promise<any>;
    export default function resolveCss<T = any>(
        load: load,
        src: string,
        dir?: string
    ): [string, Promise<T>];
}
