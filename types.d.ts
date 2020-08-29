declare module "resolve-css" {
    export type load = (file: string) => Promise<any>;
    export default async function resolveCss<T = any>(
        load: load,
        src: string,
        dir?: string
    ): [string, T];
}
