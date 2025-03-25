import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ts-vite-lib',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: [],
      output: {
        // Global variables for UMD build
        globals: {}
      }
    },
    sourcemap: true,
    // Reduce bloat
    target: 'esnext',
    minify: 'esbuild'
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
}); 
