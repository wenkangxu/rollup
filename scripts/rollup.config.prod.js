import filesize from 'rollup-plugin-filesize';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-cpy';
import { minify } from 'uglify-es';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import baseConfig from './rollup.config.base';
import { name, version, author } from '../package.json';

const REACT_GLOBALS = {};

const plugins = baseConfig.plugins.map((plugin) => {
  if (plugin.name === 'postcss') {
    return postcss({
      inject: false,
      extract: 'lib/style.css',
      use: [['less', { javascriptEnabled: true }]],
    });
  }
  return plugin;
});

// banner
const banner =
  `${'/*!\n' + ' * '}${name}.js v${version}\n` +
  ` * (c) 2018-${new Date().getFullYear()} ${author}\n` +
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
        globals: REACT_GLOBALS,
      },
      // cjs and esm version
      {
        file: `lib/${outputFileName}.cjs.js`,
        format: 'cjs',
        banner,
        globals: REACT_GLOBALS,
      },
      // cjs and esm version
      {
        file: `lib/${outputFileName}.esm.js`,
        format: 'es',
        banner,
        globals: REACT_GLOBALS,
      },
    ],
    // eslint-disable-next-line prettier/prettier
    plugins: [
      peerDepsExternal(),
      ...plugins,
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
        globals: REACT_GLOBALS,
      },
    ],
    plugins: [
      peerDepsExternal(),
      ...plugins,
      copy({
        files: ['src/style'],
        dest: 'lib/style',
        options: {
          verbose: true,
        },
      }),
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
