# resolve-css

This Package resolves the local or node_module path of the css file.

## install

```
npm install resolve-css
```

## Usage

```js
import path from "path";
import { stat } from "fs/promises";
import resolveCss from "resolve-css";

try {
    const [file, stat] = await resolveCss(stat, base, process.cwd());
} catch (e) {
    console.log("The file does not exists");
}
```

## Resolution

The resolution is local if this fault will then search node_modules, the search on node_modules by node instance.

## resolveCss

```ts
export type load = (file: string) => Promise<any>;
export default function resolveCss<T = any>(
    load: load,
    src: string,
    dir?: string
): [string, Promise<T>];
```
