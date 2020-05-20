import serve from 'rollup-plugin-serve';

import baseConfig from './rollup.config.base';
import { name } from '../package.json';

const GLOBALS = {
  'lodash': '_',
  'bowser': 'bowser',
  'query-string': 'qs',
  'warning': 'warning',
  "moment": 'moment',
};

export default [
  {
    ...baseConfig,
    input: 'example/index.js',
    output: [
      {
        file: `lib/example.js`,
        format: 'umd',
        name,
        sourcemap: true,
        globals: GLOBALS,
      },
    ],
    plugins: [
      ...baseConfig.plugins,
      serve({
        port: 8080,
        open: true,
        openPage: '/example/index.html',
        contentBase: [''],
        host: 'localhost',
      }),
    ],
  },
];
