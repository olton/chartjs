import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {banner} from "./banner"
import {SRC, DIST_LIB} from "./const"

export default {
    input: `${SRC}/browser.js`,
    output: {
        file: `${DIST_LIB}/chart.js`,
        format: 'iife',
        name: "",
        sourcemap: false,
        banner: banner,
        exports: 'named',
    },
    plugins: [
        babel(),
        resolve(),
        commonjs()
    ],
};