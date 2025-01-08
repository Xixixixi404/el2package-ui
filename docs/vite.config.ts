/*
 * @Description:
 * @Author: wangChao 6141364@qq.com
 * @Date: 2024-06-27 11:11:04
 * @LastEditors: wangChao 6141364@qq.com
 * @LastEditTime: 2025-01-08 14:39:25
 * @FilePath: \el2package-ui\docs\vite.config.ts
 * Endless Story. - NANA
 */
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性

import AutoImport from 'unplugin-auto-import/vite' // 自动导入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      dirs: ['./src/hooks'], // 用户模块
      resolvers: [ElementPlusResolver()],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      //注意这个配置和src同级
      // dts: false // 使用ts时关闭
      dts: './auto-imports.d.ts'
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 2222,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or 'modern'
      }
    }
  }
})
