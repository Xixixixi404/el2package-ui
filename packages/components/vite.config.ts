import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性
import AutoImport from 'unplugin-auto-import/vite' // 自动导入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import viteCompression from 'vite-plugin-compression' // 静态资源压缩
// import {visualizer} from 'rollup-plugin-visualizer' // 打包后的视图文件
import dts from 'vite-plugin-dts'

const chioeseExt = (assetInfo: any) => {
    // 设置不同类型文件的输出路径及命名规则
    if (
      assetInfo.type === 'asset' &&
      /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)
    ) {
      return 'img/[name].[hash].[ext]' // 图像文件输出路径及命名规则
    }
    if (
      assetInfo.type === 'asset' &&
      /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)
    ) {
      return 'fonts/[name].[hash].[ext]' // 字体文件输出路径及命名规则
    }
    return 'style.css' // 其他资源文件输出路径及命名规则
  }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      imports: ['vue', '@vueuse/core'],
      //注意这个配置和src同级
      dts: resolve(__dirname, 'auto-imports.d.ts')
    }),
    dts({ tsconfigPath: './tsconfig.build.json', outDir: ['es/', 'lib/'], entryRoot: 'src' }), // ts声明文件 和打包后的文件保持一致
    viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 压缩后是否删除原文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 文件类型
    }),
    // visualizer({
    //   open:true,  //注意这里要设置为true，否则无效
    //   gzipSize:true,
    //   brotliSize:true
    // })
  ],
  build: {
    target: 'modules',
    // 压缩
    minify: true,
    rollupOptions: {
      // 忽略打包vue文件
      external: ['vue'],
      input: ['src/index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          // 配置打包根目录
          dir: 'es',
          preserveModulesRoot: 'src',
          assetFileNames: chioeseExt
         },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'lib',
          preserveModulesRoot: 'src',
          assetFileNames: chioeseExt
        }
      ]
    },
    lib: {
      entry: './src/index.ts'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or 'modern'
      }
    }
  }
})
