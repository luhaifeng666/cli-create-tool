#!/usr/bin/env zx

require('zx/globals')
const inquirer = require('inquirer')
const { DEFAULT_QUESTIONS, CUSTOM_QUESTIONS } = require('../constants/questions')
const defaultCreateHandler = require('./default')
const customCreateHandler = require('./custom')

/**
 * 定义交互式命令行的问题
 * type ${string} 交互类型
 * name ${string} 用来接收用户输入内容的key
 * message ${交互信息}
 * Documentation: https://www.npmjs.com/package/inquirer#examples
 */
const questions = [{
  type: 'confirm',
  name: 'USE_DEFAULT',
  message: 'Use default template?'
}]

module.exports.run = async () => {
  try {
    // 获取输入的信息
    const { USE_DEFAULT } = await inquirer.prompt(questions)
    // 使用默认模式
    if (USE_DEFAULT) {
      await defaultCreateHandler(DEFAULT_QUESTIONS)
    } else {
      // 使用自定义模式创建
      await customCreateHandler([...CUSTOM_QUESTIONS, ...DEFAULT_QUESTIONS])
    }
    // 输出创建成功的命令
    console.log(chalk.green('CreationCompleted!'))
  } catch (error) {
    console.log(chalk.red(`Create objet defeat: ${error}`))
  }
}
