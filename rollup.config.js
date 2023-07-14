import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import copy from 'rollup-plugin-copy';
import multiInput from 'rollup-plugin-multi-input';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { swc } from 'rollup-plugin-swc3';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json' assert { type: 'json' };

const EXCLUDED_FILES = [/node_modules/, 'src/**/__tests__', 'src/test'];
const ENABLE_SOURCE_MAP = process.env.BUILD_SOURCE_MAPS === 'true' || process.env.NODE_ENV === 'development';

const baseConfig = defineConfig({
  external: ['react', 'react-dom', '@nebula.js/stardust'],
  plugins: [
    ...(ENABLE_SOURCE_MAP ? [sourcemaps()] : []),
    visualizer({
      filename: './build-reports/bundle-analyzer-report.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    postcss(),
    json(),
    /**
     * Builds the type declarations.
     */
    typescript({
      tsconfig: 'tsconfig.build.json',
      exclude: EXCLUDED_FILES,
      emitDeclarationOnly: true,
      sourceMap: ENABLE_SOURCE_MAP,
    }),
    /**
     * Transpiles the source code.
     */
    swc({
      tsconfig: 'tsconfig.build.json',
      include: [/\.tsx?$/],
      exclude: EXCLUDED_FILES,
      sourceMaps: ENABLE_SOURCE_MAP,
    }),
    copy({
      targets: [
        { src: 'package.json', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'LICENSE', dest: 'dist' },
      ],
    }),
    commonjs(),
    external({
      includeDependencies: true,
    }),
    nodeResolve(),
  ],
});

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, file: "dist/index.js", format: 'cjs', sourcemap: ENABLE_SOURCE_MAP },
      { file: pkg.module, file: "dist/index.js", format: 'es', sourcemap: ENABLE_SOURCE_MAP },
    ],
    ...baseConfig,
  },
  {
    input: ['src/**/*.(ts|tsx)', '!src/index.ts', '!src/**/__tests__', '!src/__storybook__'],
    output: {
      dir: 'dist',
      exports: 'auto',
      format: 'es',
      sourcemap: ENABLE_SOURCE_MAP,
    },
    ...baseConfig,
    plugins: [
      ...baseConfig.plugins,
      multiInput.default({
        relative: 'src/',
      }),
    ],
    cache: process.env.NODE_ENV === 'development',
  },
]);