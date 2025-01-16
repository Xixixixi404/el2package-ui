import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 设置neme属性
import AutoImport from 'unplugin-auto-import/vite' // 自动导入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import viteCompression from 'vite-plugin-compression' // 静态资源压缩
import { visualizer } from 'rollup-plugin-visualizer' // 打包后的视图文件
import dts from 'vite-plugin-dts' // 自动生成声明文件

import autoprefixer from 'autoprefixer' // 浏览器css兼容

import copy from 'rollup-plugin-copy' // 文件拷贝
import del from 'rollup-plugin-delete' // 文件删除

import { terser } from 'rollup-plugin-terser' // 配置打包后的压缩

const chioeseExt = (assetInfo: any) => {
  // 设置不同类型文件的输出路径及命名规则
  if (assetInfo.type === 'asset' && /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)) {
    return 'img/[name].[hash].[ext]' // 图像文件输出路径及命名规则
  }
  if (assetInfo.type === 'asset' && /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)) {
    return 'fonts/[name].[hash].[ext]' // 字体文件输出路径及命名规则
  }
  return 'index.css' // 其他类型文件输出路径及命名规则
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
    dts({ tsconfigPath: './tsconfig.build.json', outDir: ['es', 'lib', 'dist/@types'], entryRoot: 'src' }), // ts声明文件 和打包后的文件保持一致
    terser({
      // 保留注释
      format: {
        comments: 'all'
      }
    }),
    viteCompression({
      verbose: true,
      disable: false, // 不禁用压缩
      deleteOriginFile: false, // 压缩后是否删除原文件
      threshold: 10240, // 压缩前最小文件大小
      algorithm: 'gzip', // 压缩算法
      ext: '.gz' // 文件类型
    }),
    copy({
      targets: [{ src: 'es/*.css', dest: 'dist' }],
      verbose: true,
      hook: 'generateBundle'
    }),
    del({
      targets: [
        // 设置删除规则，删除原来位置的 CSS 文件
        'es/*.css',
        'lib/*.css',
        'dist/style.css'
      ],
      hook: 'closeBundle' // 在 writeBundle 钩子时执行删除操作
    }),
    // 打包后的文件分析
    visualizer({
      open: true, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    target: 'modules',
    minify: true, // 压缩
    rollupOptions: {
      external: ['vue', '@vueuse/core', 'vuedraggable'], // 配置外部 依赖 需同时配置 package.json 文件中的 peerDependencies
      input: ['src/index.ts'], // 入口文件
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs', // 设置打包文件名称
          preserveModules: true, // 保持源文件的模块结构
          dir: 'es', // 配置打包根目录
          preserveModulesRoot: 'src', // 入口文件
          assetFileNames: chioeseExt // 设置不同类型文件的输出路径及命名规则
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js', // 设置打包文件名称
          preserveModules: true, // 保持源文件的模块结构
          dir: 'lib', // 配置打包根目录
          preserveModulesRoot: 'src', // 入口文件
          assetFileNames: chioeseExt // 设置不同类型文件的输出路径及命名规则
        }
      ]
    },
    lib: {
      entry: './src/index.ts',
      name: 'el2package-ui',
      fileName: 'el2package-ui'
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    },
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler', // or 'modern'
        silenceDeprecations: ['legacy-js-api']
      }
    }
  }
})
