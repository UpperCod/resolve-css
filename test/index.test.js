import path from "path";
import { stat } from "fs/promises";
import test from "ava";
import resolveCss from "../src";

test("local resolve", async (t) => {
    const base = "style.css";
    const file = path.join(__dirname, base);
    const [url] = await resolveCss(stat, base, __dirname);
    t.is(file, url);
});

test("node_module", async (t) => {
    const [url] = await resolveCss(stat, "bulma");
    t.is(url, require.resolve("bulma"));
});

test("node_module subitem", async (t) => {
    const [url] = await resolveCss(stat, "bulma/css/bulma.css");
    t.is(url, require.resolve("bulma/css/bulma.css"));
});
