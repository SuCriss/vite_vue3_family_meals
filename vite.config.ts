import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    // base: './',
    publicDir: '',
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `vant/es/${name}/style`
          }
        ]
      })
    ],
    server: {
      open: true,
      host:'localhost',
      port: 9080,
      proxy: {
        '/api': {
          target: "https://therapeutic-spiral-foxtail.glitch.me",
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
        "@": path.resolve(__dirname, 'src'),
        "@/comp": path.resolve(__dirname, 'src/components'),
        "@/http":path.resolve(__dirname,'src/http')
      }
    }
    // base:loadEnv(mode,process.cwd()).VITE_APP_URL
  })
}

