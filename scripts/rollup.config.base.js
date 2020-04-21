import alias from 'rollup-plugin-alias';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';

export default {
  input: 'src/index.js',
  plugins: [
    alias({
      resolve: ['.js', '.jsx', '.tsx', '.ts', '.less', '.css'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    json(),
    resolve({
      mainFields: ['main', 'module'],
    }),
    postcss({
      extract: 'lib/style.example.css',
      use: [['less', { javascriptEnabled: true, modifyVars: {} }]],
      plugins: [],
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**',
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        './node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement', 'PureComponent'],
        './node_modules/react-dom/index.js': ['render'],
        './node_modules/react-is/index.js': ['isFragment'],
        './node_modules/fbjs/lib/ExecutionEnvironment.js': ['canUseDOM'],
        './node_modules/immutable/dist/immutable.js': ['Map', 'OrderedSet', 'is'],
      },
    }),
    svgr(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**', // only transpile our source code
    }),
  ],
};
