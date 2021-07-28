import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default ({mode}) => {
  return  defineConfig({
    plugins: [
      vue(),
      styleImport({
        libs:[
          {
            libraryName:'vant',
            esModule:true,
            resolveStyle:(name) => `vant/es/${name}/style`
          }
        ]
      })
    ],
    // base:loadEnv(mode,process.cwd()).VITE_APP_URL
  })
}

