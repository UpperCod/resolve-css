import path from "path";
import createCache from "@uppercod/cache";

const dirDef = process.cwd();
const cache = createCache();
/**
 * Returns the local or node_modules content of css depending on the path
 * @template T;
 * @param {(src:string)=>Promise<T>} load
 * @param {string} dir
 * @param {string} src
 * @returns {Promise<[string,T]>}
 */
export default async function resolveCss(load, src, dir) {
    try {
        const nextSrc = path.join(dir || dirDef, src);
        return [nextSrc, await load(nextSrc)];
    } catch (e) {}
    return cache(resolveNodeModules, [load, src]);
}
/**
 * @param {(src:string)=>Promise<string>} load
 * @param {string} src
 * @returns {Promise<[string,string]>}
 */
async function resolveNodeModules(load, src) {
    const test = src.match(/(?:(@\w+\/[^\/]+)|([^\/]+))(.*)/);

    if (test) {
        const [, name1, name2, folder] = test;

        let md;
        try {
            md = require.resolve(src);
        } catch (e) {
            md = require.resolve(name1 || name2);
        }

        const { dir, ext, base } = path.parse(md);

        const nextSrc = path.join(
            dir,
            ext == ".css" ? base : folder.endsWith(".css") ? folder : base
        );

        return [nextSrc, await load(nextSrc)];
    }
}
