#! /usr/bin/env node

const path = require('path')
const process = require('process')
const colors = require('colors')
const shell = require('shelljs')
const { program } = require('commander')
const packageJson = require('../package.json')
const COLORS_DEFINATION = require('../utils/console-colors.js')

console.log(path.dirname(__dirname))

/** 定义控制台的输出颜色 */
colors.setTheme(COLORS_DEFINATION)

const argvs = process.argv.slice(2)

argvs.forEach(key => {
  switch (key) {
    /** 查看当前插件版本 */
    case '-v':
    case '--version':
      program.option('-v, --version', 'get the tool\'s version information')
        .version(`v${packageJson.version}`)
        .parse(process.argv)
      break
    /** 更新当前插件至最新版本 */
    case '-u':
    case '--update':
      /** version 为可选参数，如果不设，默认值为true */
      program.option('-u, --update [version]', 'update the tool')
        .parse(process.argv)
      const options = program.opts()
      /** 如果没有设置详细的版本号，则默认升级到最新版本 */
      let version = ''
      if (options.update === true) {
        console.log('升级到最新的版本'.success)
      } else {
        version = options.update
        console.log(`升级到${options.update}版本`.success)
      }
      shell.exec(`yarn upgrade cli-create-tool${version ? `@${version}` : ''}`)
      break
    /** 创建包项目 */
    case '-C':
    case '--create':
      console.log('create a cli project')
      break
    default: break
  }
})
