import serve from 'rollup-plugin-serve';

import baseConfig from './rollup.config.base';
import { name } from '../package.json';

const REACT_GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
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
        globals: REACT_GLOBALS,
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
