import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import baseConfig from './rollup.config.base';
import { name, version, author } from '../package.json';

const GLOBALS = {
    'lodash': '_',
    'bowser': 'bowser',
    'query-string': 'qs',
    'warning': 'warning',
    "moment": 'moment',
  };

// banner
const banner =
  `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2020-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the MIT License.\n` +
  ` */`;

// @lego/xx-yy => xxYy
let outputFileName = name.replace(/^@[\w-]+\//, '');
outputFileName = outputFileName.replace(/-([a-z])/g, (_, match1) => match1.toUpperCase());

// 支持输出 []
export default [
    // .js, .cjs.js, .esm.js
    {
        ...baseConfig,
        output: [
            // umd development version with sourcemap
            {
                file: `lib/${outputFileName}.js`,
                format: 'umd',
                name,
                banner,
                sourcemap: true,
                globals: GLOBALS,
            },
            // cjs and esm version
            {
                file: `lib/${outputFileName}.cjs.js`,
                format: 'cjs',
                banner,
                // globals: REACT_GLOBALS,
            },
            // cjs and esm version
            {
                file: `lib/${outputFileName}.esm.js`,
                format: 'es',
                banner,
                // globals: REACT_GLOBALS,
            },
        ],
        // eslint-disable-next-line prettier/prettier
        plugins: [
            ...baseConfig.plugins,
            peerDepsExternal(),
            filesize(),
        ],
    },
    // .min.js
    {
        ...baseConfig,
        output: [
        // umd with compress version
        {
            file: `lib/${outputFileName}.min.js`,
            format: 'umd',
            name,
            banner,
            globals: GLOBALS,
        },
        ],
        plugins: [
            ...baseConfig.plugins,
            peerDepsExternal(),
            uglify(
                {
                compress: {
                    drop_console: true,
                },
                },
                minify
            ),
            filesize(),
        ],
    },
];
