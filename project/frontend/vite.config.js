// 导入vite配置方法和vue插件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 导出配置对象
export default defineConfig({
  // 使用vue插件（必需）
  plugins: [vue()],
  
  // 开发服务器配置
  server: {
    // 设置API代理（解决跨域）
    proxy: {
      '/api': {  // 拦截所有/api开头的请求
        target: 'http://localhost:8000',  // 转发到后端地址
        changeOrigin: true,  // 修改请求来源
        rewrite: (path) => path.replace(/^\/api/, '')  // 去掉/api前缀
      }
    }
  },
  
  // 生产构建配置
  build: {
    outDir: '../backend/static',  // 输出到后端static目录
    emptyOutDir: true,  // 构建前清空目录
    assetsDir: 'assets',  // 静态资源存放目录
    rollupOptions: {  // 高级构建配置
      output: {
        // 文件命名规则（带hash防缓存）
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
})