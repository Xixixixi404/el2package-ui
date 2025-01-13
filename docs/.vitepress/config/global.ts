import { resolve } from 'path'

// 项目目录
export const projRoot = resolve(__dirname, '..', '..', '..')

// 组件示例目录
export const docsDirName = 'examples'

// 文档库目录
export const docRoot = resolve(projRoot, docsDirName)

console.log('docRoot', docRoot)
