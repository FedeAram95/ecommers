import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/main.scss" as *;`,
        sassOptions: {
          outputStyle: 'expanded',
          fiber: false
        }
      }
    }
  },
  server: {
    port: 8080,
    hmr: {
      overlay: true,
      protocol: 'ws',
      host: 'localhost'
    },
    watch: {
      usePolling: true,
      interval: 1000
    },
    middlewareMode: false,
    fs: {
      strict: true,
      allow: ['..']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // ← elimina el "/api"
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['vuetify', '@mdi/font', 'material-design-icons-iconfont'],
          'utils-vendor': ['axios', '@vuelidate/core', '@vuelidate/validators']
      }
    }
    },
    chunkSizeWarningLimit: 1000
  },
  define: {
    'process.env': {}
  }
}) 