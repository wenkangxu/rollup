import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    json(),
    resolve(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
  external: ['lodash', 'bowser', 'query-string', 'warning', 'moment'],
//   external: id => (
//     /^babel|^lodash|^bowser|^query-string|^warning/.test(id)
//   ),
};
