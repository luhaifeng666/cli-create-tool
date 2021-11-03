#! /usr/bin/env node

const path = require('path')
const process = require('process')
const shell = require('shelljs')
const { program } = require('commander')
const packageJson = require('../package.json')
const helpHandle = require('../src/utils/help')
const { run } = require('../src/create/index')

/** 定义帮助信息 */
helpHandle()

const argvs = process.argv.slice(2)

argvs.forEach(key => {
  switch (key) {
    /** 查看当前插件版本 */
    case '-v':
    case '--version':
      program.version(`v${packageJson.version}`).parse(process.argv)
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
        console.log(`升级${packageJson.name}到最新的版本`)
        shell.exec(`npm update -g ${packageJson.name}`)
      } else {
        version = options.update
        console.log(`安装${packageJson.name}@${version}`)
        shell.exec(`npm i -g ${packageJson.name}@${version}`)
      }
      break
    /** 创建包项目 */
    case '-c':
    case '--create':
      run()
      break
    default: break
  }
})
