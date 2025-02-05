import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //配置代理
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8091',// 后端服务器地址
        rewrite: path => path.replace(/^\/api/, ''), // 将原有请求路径中的api替换为''
        changeOrigin: true,// 是否允许跨域
      }
    }
  },
})
